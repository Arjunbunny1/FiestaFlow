# FiestaFlow Architecture Documentation

## Overview
FiestaFlow is a full-stack event management application built with a React frontend, Node.js/Express backend, and MongoDB database. It supports user authentication, event CRUD operations, and a modern UI with Material-UI.

---

## 1. Database Schema

### User Collection (`users`)
- **_id**: ObjectId
- **username**: String (unique, required)
- **email**: String (unique, required)
- **password**: String (hashed, required)
- **createdAt**: Date
- **updatedAt**: Date

### Event Collection (`events`)
- **_id**: ObjectId
- **title**: String (required)
- **type**: String (required, e.g., Wedding, Conference, etc.)
- **isOnline**: Boolean
- **capacity**: Number
- **confirmedCount**: Number
- **date**: Date (required)
- **location**: String
- **description**: String
- **owner**: ObjectId (ref: User, required)
- **createdAt**: Date
- **updatedAt**: Date
- **remainingSeats**: Virtual (capacity - confirmedCount)

---

## 2. Backend Class/Module Breakdown

- **server.js**: Main entry, Express app setup, CORS, routes, error handling
- **config/db.js**: MongoDB connection logic
- **models/User.js**: User schema, password hashing, comparePassword method
- **models/Event.js**: Event schema, validation, virtuals, indexes
- **controllers/authController.js**: Register, login, logout, getMe logic
- **controllers/eventController.js**: CRUD for events, search, sort, pagination
- **middleware/authMiddleware.js**: JWT authentication middleware
- **routes/authRoutes.js**: Auth endpoints (register, login, getMe)
- **routes/eventRoutes.js**: Event endpoints (CRUD, all protected)
- **utils/asyncHandler.js**: Async error handling wrapper

---

## 3. Frontend Module Breakdown

- **src/App.js**: Routing, theme, context provider
- **src/contexts/AuthContext.js**: Auth state, login/register/logout logic
- **src/services/api.js**: Axios instance, API base URL, interceptors
- **src/services/index.js**: Auth and event API service functions
- **src/pages/Login.js**: Login form, calls AuthContext
- **src/pages/Register.js**: Registration form, calls AuthContext
- **src/pages/Events_New.js**: Event list, search, sort, pagination, delete
- **src/pages/EventForm.js**: Create/edit event form
- **src/pages/Profile.js**: User stats, recent events
- **src/components/Header.js**: Navigation bar
- **src/components/ProtectedRoute.js**: Route protection
- **src/utils/constants.js**: Event types, sort options, utility functions

---

## 4. Data Flow

- **Frontend** calls API endpoints via Axios (with JWT in headers)
- **Backend** authenticates, processes, and responds with JSON
- **MongoDB** stores users and events
- **Frontend** updates UI based on API responses

---

## 5. Deployment Notes
- **Backend**: Node.js/Express on Render, MongoDB Atlas
- **Frontend**: React static site on Render, API URL set via env var
- **CORS**: Configured for local and deployed frontend URLs
- **Routing**: SPA routing handled by React Router with rewrite rule for static hosting
