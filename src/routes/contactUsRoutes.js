const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const contactUsController = require('../controllers/contactUsController');

// Create contact message (public route)
router.post('/', contactUsController.createContact);

// Protected routes
router.use(checkAuth);
router.get('/', contactUsController.getAllContacts);
router.put('/:id/read', contactUsController.markAsRead);
router.delete('/:id', contactUsController.deleteContact);

module.exports = router;