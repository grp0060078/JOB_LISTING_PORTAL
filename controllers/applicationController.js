//controllers/applicationController.js

const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// Create a new application
exports.createApplication = async (req, res) => {
  const { id } = req.params;
  const { coverLetter } = req.body;
  const resume = req.file ? req.file.path : null;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const application = new Application({
      jobId: id,
      userId: req.user.id,
      coverLetter,
      resume
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all applications for a specific user

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('job');
    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found' });
    }
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get a specific application by ID
exports.getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the application by ID and populate job details
    const application = await Application.findById(id)
      .populate('job', 'title company') 
      .populate('user', 'name email');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a specific application
exports.updateApplication = async (req, res) => {
  const { id } = req.params; 
  const updates = req.body; 

  try {
    // Find and update the application
    const application = await Application.findByIdAndUpdate(id, updates, { new: true })
      .populate('job', 'title company'); 

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a specific application
exports.deleteApplication = async (req, res) => {
  const { id } = req.params; 

  try {
    // Find and delete the application
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
