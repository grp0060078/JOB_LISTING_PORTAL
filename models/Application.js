//models/Application.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the ApplicationSchema

const applicationSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
   
  },
  job: {
    type: Schema.Types.ObjectId, 
    ref: 'Job', 
   
  },
  title: { 
    type: String 
  },
  resume: { 
    type: String 
  },
  coverLetter: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['Applied', 'Pending', 'Reviewed', 'Interview Scheduled'], 
    default: 'Applied' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Application', applicationSchema);
