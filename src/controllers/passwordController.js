// controllers/passwordController.js

const AdminModel = require('../models/adminModal');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/emailService');
const { newAdminAccountTemplate } = require('../Templates/emailTemplates');
const { generateResponse } = require('../utils/responseUtils');
const { Op } = require('sequelize');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return generateResponse(res, 400, 'Email is required');
        }

        const admin = await AdminModel.findOne({ where: { email } });

        if (!admin) {
            return generateResponse(res, 404, 'Admin not found');
        }

        const resetToken = uuidv4();
        const resetTokenAt = new Date();
        const resetTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await admin.update({
            resetToken,
            resetTokenAt,
            resetTokenExp
        });

        try {
            const resetUrl = `${process.env.ADMIN_URL}/auth/reset-password/${resetToken}`;
            const subject = 'Password Reset Request';
            const htmlContent = newAdminAccountTemplate(admin.email, resetUrl);
            await sendEmail(email, subject, htmlContent);
        } catch (emailError) {
            console.error('Error sending password reset email:', emailError);
            return generateResponse(res, 500, 'Error sending password reset email');
        }

        generateResponse(res, 200, 'Password reset email sent successfully');
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        generateResponse(res, 500, 'Error processing forgot password request', { error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, password } = req.body;

        if (!resetToken || !password) {
            return generateResponse(res, 400, 'Reset token and password are required');
        }

        const admin = await AdminModel.findOne({
            where: {
                resetToken,
                resetTokenExp: { [Op.gt]: new Date() }
            }
        });

        if (!admin) {
            return generateResponse(res, 400, 'Invalid or expired reset token');
        }

        await admin.update({
            password,
            resetToken: null,
            resetTokenAt: null,
            resetTokenExp: null
        });

        generateResponse(res, 200, 'Password reset successfully');
    } catch (error) {
        console.error('Error in resetPassword:', error);
        generateResponse(res, 500, 'Error resetting password', { error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const adminId = req.user.id;

        if (!currentPassword || !newPassword) {
            return generateResponse(res, 400, 'Current password and new password are required');
        }

        const admin = await AdminModel.findByPk(adminId);

        if (!admin) {
            return generateResponse(res, 404, 'Admin not found');
        }

        const isPasswordValid = await admin.validatePassword(currentPassword);
        if (!isPasswordValid) {
            return generateResponse(res, 401, 'Current password is incorrect');
        }

        await admin.update({ password: newPassword });

        generateResponse(res, 200, 'Password changed successfully!');
    } catch (error) {
        console.error('Error in changePassword:', error);
        generateResponse(res, 500, 'Error changing password', { error: error.message });
    }
};
