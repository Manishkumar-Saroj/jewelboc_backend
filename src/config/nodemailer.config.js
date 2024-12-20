// config/nodemailer.config.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a nodemailer transporter object using Gmail service
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;