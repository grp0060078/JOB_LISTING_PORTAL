// controllers/contactController.js
const Contact = require('../models/Contact');
const sendContactEmail = require('../services/emailService');

exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();
    
    // Send the contact form message via email
    await sendContactEmail({ name, email, message });

    res.status(201).json({ message: 'Contact message received and email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving contact message or sending email' });
  }
};
