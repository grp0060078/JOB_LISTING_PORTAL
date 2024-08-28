//models/Profile.js

const mongoose = require('mongoose');

// Define the Profile schema
const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    bio: {
        type: String,
        
    },
    skills: {
        type: [String], 
   
    },
    name: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
