const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const sipController = require('../controllers/sipController');

// All routes are protected with checkAuth middleware
router.use(checkAuth);

// SIP routes
router.post('/', sipController.createSip);
router.get('/', sipController.getAllSips);
router.delete('/:id', sipController.deleteSip);

module.exports = router;