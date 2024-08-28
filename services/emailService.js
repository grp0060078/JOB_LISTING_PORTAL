// services/emailService.js
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  
  }
});

const sendContactEmail = async (contact) => {
  const { name, email, message } = contact;

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL, 
    subject: 'New Contact Form Message',
    text: `You have a new contact form message from ${name} (${email}):\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendContactEmail;
