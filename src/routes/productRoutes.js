const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

// All routes are protected with checkAuth middleware
router.use(checkAuth);

// Product routes
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.delete('/:productId/images/:imageId', productController.deleteProductImage);

module.exports = router;