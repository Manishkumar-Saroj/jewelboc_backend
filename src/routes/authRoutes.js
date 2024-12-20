// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

// Check if the user is authenticated (any role)
router.get('/checkAuth', checkAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Authenticated as ${req.role}`,
    user: req.user
  });
});

// Route for user login
router.post('/login', authController.login);

// Route for user logout
router.post('/logout', checkAuth, authController.logout);



module.exports = router;