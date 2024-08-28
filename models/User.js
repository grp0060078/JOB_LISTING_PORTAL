//models/User.js

const mongoose = require('mongoose');

//Define the UserSchema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String},
  password: { type: String }
});

module.exports = mongoose.model('User', userSchema);
