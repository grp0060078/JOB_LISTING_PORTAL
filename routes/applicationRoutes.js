// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, applicationController.getApplications);
router.post('/', authenticateToken, applicationController.createApplication);
router.put('/:id', authenticateToken, applicationController.updateApplication);
router.get('/:id',  authenticateToken, applicationController.getApplicationById);
router.delete(':id',  authenticateToken, applicationController.deleteApplication);

module.exports = router;
