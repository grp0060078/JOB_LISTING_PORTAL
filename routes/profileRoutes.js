// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');


router.post('/', authenticateToken,profileController.createProfile);

router.get('/job-seeker',authenticateToken, profileController.getProfile);

router.put('/job-seeker',authenticateToken, profileController.updateProfile);
router.get('/all', authenticateToken, profileController.getAllProfiles);

module.exports = router;
