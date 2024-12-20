// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const passwordController = require('../controllers/passwordController');

// Check if the user is authenticated
router.get('/checkAuth', checkAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authenticated Successful',
    user: req.user
  });
});

// Auth routes
router.post('/login', authController.login);
router.post('/logout', checkAuth, authController.logout);

// Password-related routes
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword);
router.post('/change-password', checkAuth, passwordController.changePassword);

module.exports = router;