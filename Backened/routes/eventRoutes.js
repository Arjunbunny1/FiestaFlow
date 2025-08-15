// routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected (user must be logged in)
router.use(protect);

// Create a new event
router.post('/', createEvent);

// Get all events for the logged-in user (with search + sort)
router.get('/', getMyEvents);

// Get a specific event by ID
router.get('/:id', getEventById);

// Update an event
router.put('/:id', updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;
