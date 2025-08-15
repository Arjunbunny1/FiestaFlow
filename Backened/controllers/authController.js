const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

// Helper: Generate token & send in cookie
const sendToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // not checking NODE_ENV, just plain false for now
    sameSite: 'strict'
  });

  res.json({
    success: true,
    message: 'Authentication successful',
    token,
    user: {
      id: user._id,
      name: user.username, // Frontend expects 'name'
      username: user.username,
      email: user.email
    }
  });
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  
  // Use 'name' from frontend or 'username' for compatibility
  const userDisplayName = name || username;

  if (!userDisplayName || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username: userDisplayName }] });
  if (existingUser) {
    res.status(400);
    throw new Error('Username or email already in use');
  }

  const user = await User.create({ 
    username: userDisplayName, 
    email, 
    password 
  });
  sendToken(user, res);
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  sendToken(user, res);
});


const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  
  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.username,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    }
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
