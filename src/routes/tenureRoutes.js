const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const tenureController = require('../controllers/tenureController');

// All routes are protected with checkAuth middleware
router.use(checkAuth);

// Tenure routes
router.post('/', tenureController.createTenure);
router.get('/', tenureController.getAllTenures);
router.put('/:id', tenureController.updateTenure);
router.delete('/:id', tenureController.deleteTenure);

module.exports = router;