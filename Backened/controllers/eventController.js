const asyncHandler = require('../utils/asyncHandler');
const { Event } = require('../models/Event');


const createEvent = asyncHandler(async (req, res) => {
  const { title, type, isOnline, capacity, date, location, description, confirmedCount } = req.body;

  if (!title || !type || !date) {
    res.status(400);
    throw new Error('Title, event type, and date are required');
  }
  
  if (confirmedCount > capacity) {
    res.status(400);
    throw new Error('Confirmed count cannot exceed capacity');
  }

  const event = await Event.create({
    title,
    type,
    isOnline,
    capacity,
    date,
    location,
    description,
    confirmedCount: confirmedCount || 0,
    owner: req.user._id
  });

  res.status(201).json(event);
});


const getMyEvents = asyncHandler(async (req, res) => {
  const { search, sortBy, sortOrder, page, limit } = req.query;

  
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  // Only events owned by the logged-in user
  let query = { owner: req.user._id };

  // Text search (title/type)
  if (search) {
    query.$text = { $search: search };
  }

  // Sorting
  let sort = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sort.date = 1; // default ascending by date
  }

  // Get total count for pagination
  const totalEvents = await Event.countDocuments(query);

  // Fetch events with pagination
  const events = await Event.find(query)
    .sort(sort)
    .skip(skip)
    .limit(pageSize);

  res.json({
    page: pageNumber,
    totalPages: Math.ceil(totalEvents / pageSize),
    totalEvents,
    events
  });
});



const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ _id: req.params.id, owner: req.user._id });

  if (!event) {
    res.status(404);
    throw new Error('Event not found or not authorized');
  }

  res.json(event);
});


const updateEvent = asyncHandler(async (req, res) => {
  let event = await Event.findOne({ _id: req.params.id, owner: req.user._id });

  if (!event) {
    res.status(404);
    throw new Error('Event not found or not authorized');
  }

  const allowedUpdates = [
    'title',
    'type',
    'isOnline',
    'capacity',
    'date',
    'location',
    'description',
    'confirmedCount'
  ];

  const updates = Object.keys(req.body);
  updates.forEach((field) => {
    if (!allowedUpdates.includes(field)) {
      delete req.body[field];
    }
  });

  
  if (req.body.confirmedCount !== undefined) {
    if (req.body.confirmedCount > (req.body.capacity || event.capacity)) {
      res.status(400);
      throw new Error('Confirmed count cannot exceed capacity');
    }
    if (req.body.confirmedCount < 0) {
      res.status(400);
      throw new Error('Confirmed count cannot be negative');
    }
  }

  event = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(event);
});


const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ _id: req.params.id, owner: req.user._id });

  if (!event) {
    res.status(404);
    throw new Error('Event not found or not authorized');
  }

  await event.deleteOne();
  res.json({ message: 'Event removed' });
});

module.exports = {
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
