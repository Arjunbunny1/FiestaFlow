import api from './api';

// Auth Services
export const authService = {
  register: async (userData) => {
    console.log('Sending registration data:', userData);
    const response = await api.post('/auth/register', userData);
    console.log('Registration response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    console.log('Sending login data:', credentials);
    const response = await api.post('/auth/login', credentials);
    console.log('Login response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Event Services
export const eventService = {
  getEvents: async (search = '', sort = '', page = 1, limit = 10) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    
    // Handle sorting - split sort parameter into sortBy and sortOrder
    if (sort) {
      if (sort.startsWith('-')) {
        params.append('sortBy', sort.substring(1));
        params.append('sortOrder', 'desc');
      } else {
        params.append('sortBy', sort);
        params.append('sortOrder', 'asc');
      }
    }
    
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    
    console.log('Fetching events with params:', params.toString());
    const response = await api.get(`/events?${params.toString()}`);
    console.log('Events response:', response.data);
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    console.log('Updating event:', id, eventData);
    const response = await api.put(`/events/${id}`, eventData);
    console.log('Update response:', response.data);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};
