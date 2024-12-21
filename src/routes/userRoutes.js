const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// All routes are protected with checkAuth middleware
router.use(checkAuth);

// Create new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

module.exports = router;