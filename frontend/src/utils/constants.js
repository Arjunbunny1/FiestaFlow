export const EVENT_TYPES = [
  'Wedding',
  'Conference',
  'Birthday',
  'Concert',
  'Meetup',
  'Workshop'
];

export const SORT_OPTIONS = [
  { value: 'date', label: 'Date (Newest First)' },
  { value: '-date', label: 'Date (Oldest First)' },
  { value: 'type', label: 'Event Type' },
  { value: 'capacity', label: 'Capacity (Low to High)' },
  { value: '-capacity', label: 'Capacity (High to Low)' }
];

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateForInput = (date) => {
  return new Date(date).toISOString().slice(0, 16);
};

export const isEventPast = (date) => {
  return new Date(date) < new Date();
};
