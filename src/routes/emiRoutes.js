const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const emiController = require('../controllers/emiController');

// All routes are protected with checkAuth middleware
router.use(checkAuth);

// EMI routes
router.post('/', emiController.createEmi);
router.get('/', emiController.getAllEmis);
router.delete('/:id', emiController.deleteEmi);

module.exports = router;