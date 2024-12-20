// utils/emailService.js

const transporter = require('../config/nodemailer.config');

const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail
};