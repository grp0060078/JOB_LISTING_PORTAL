// routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authenticateToken = require('../middleware/authMiddleware');


// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.post('/:jobId/apply', authenticateToken, jobController.applyForJob);


router.post('/', authenticateToken, jobController.createJob);
router.put('/:id', authenticateToken, jobController.updateJob);
router.delete('/:id', authenticateToken, jobController.deleteJob);
router.get('/search', authenticateToken, jobController.searchJobs);
router.get('/filter', authenticateToken,  jobController.getFilteredApplications);
module.exports = router;

