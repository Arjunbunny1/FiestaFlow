const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password during login
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
