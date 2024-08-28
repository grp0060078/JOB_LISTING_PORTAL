//controllers/profileController.js

const Profile = require('../models/Profile');

// Fetch profile

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!userId) return res.status(400).json({ error: 'User ID is missing' });

    const profile = await Profile.findOne({ userId });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id; 
  const { name, email } = req.body; 
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { name, email },
      { new: true } 
    );
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createProfile = async (req, res) => {
  const { userId, bio, skills } = req.body;
  
  try {
    
    let profile = await Profile.findOne({ userId });
    if (profile) {
      // Update existing profile
      profile.bio = bio || profile.bio;
      profile.skills = skills || profile.skills;
      profile = await profile.save();
      return res.json(profile);
    }
    // Create a new profile
    profile = new Profile({
      userId,
      bio,
      skills
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};