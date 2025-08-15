const mongoose = require('mongoose');

const DEFAULT_EVENT_TYPES = [
  'Wedding',
  'Conference',
  'Birthday',
  'Concert',
  'Meetup',
  'Workshop'
];

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return DEFAULT_EVENT_TYPES.includes(value) || value.trim().length > 0;
      },
      message: 'Event type must be in default list or a valid custom name'
    }
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  capacity: {
    type: Number,
    default: 0,
    min: 0
  },
  confirmedCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

eventSchema.virtual('remainingSeats').get(function () {
  return Math.max(0, (this.capacity || 0) - (this.confirmedCount || 0));
});

// Indexes for search and filtering
eventSchema.index({ title: 'text' });
eventSchema.index({ type: 1, date: 1 });

module.exports = {
  Event: mongoose.model('Event', eventSchema),
  DEFAULT_EVENT_TYPES
};
