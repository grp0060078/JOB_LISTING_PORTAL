//controllers/jobController.js

const Job = require('../models/Job')
const Application = require('../models/Application');


exports.applyForJob = async (req, res) => {
  const { coverLetter } = req.body;
  const { jobId } = req.params;
  const resume = req.file ? req.file.path : null; // Access the uploaded resume file

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Create new application
    const newApplication = new Application({
      userId: req.user.id,
      job: jobId,
      coverLetter,
      resume,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', newApplication });
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJob = async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  try {
    const newJob = new Job({ title, description, company, location, salary });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const job = await Job.findByIdAndUpdate(id, updates, { new: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search for jobs

exports.searchJobs = async (req, res) => {
  try {
    const { query } = req.query;  // Extract the search query from the URL

    // Perform a search based on the job title (or any other field you want to search by)
    const jobs = await Job.find({
      title: { $regex: query, $options: 'i' }  // Case-insensitive search
    });

    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFilteredApplications = async (req, res) => {
  try {
    const filters = {};

    // Adding filters based on query parameters
    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: 'i' };  // Case-insensitive search for title
    }
    if (req.query.company) {
      filters['job.company'] = { $regex: req.query.company, $options: 'i' };  // Filter by company name
    }
    if (req.query.location) {
      filters['job.location'] = { $regex: req.query.location, $options: 'i' };  // Filter by location
    }
    if (req.query.status) {
      filters.status = req.query.status;  // Filter by application status
    }

    const applications = await JobApplication.find(filters).populate('job');
    
    if (applications.length) {
      return res.status(404).json({ message: 'No applications found' });
    }

    res.json(applications);
  } catch (error) {
    console.error('Error fetching filtered applications:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};