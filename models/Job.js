//models/Job.js

const mongoose = require('mongoose');

//Define the JobSchema
const jobSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String},
  company: { type: String },
  location: { type: String},
  salary: { type: String },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('Job', jobSchema);
