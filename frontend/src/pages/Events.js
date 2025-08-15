// This file is deprecated - use Events_New.js instead
// Keeping as placeholder to avoid import errors

import React from 'react';
import { Navigate } from 'react-router-dom';

const Events = () => {
  return <Navigate to="/events" replace />;
};

export default Events;