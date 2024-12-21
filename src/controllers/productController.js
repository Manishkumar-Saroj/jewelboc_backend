const Product = require('../models/productModal');
const ProductImage = require('../models/productImageModal');
const { generateResponse } = require('../utils/responseUtils');
const { upload, getImageBase64 } = require('../utils/imageHandler');

exports.createProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return generateResponse(res, 400, err.message);
            }

            try {
                const { name, category, price, stock } = req.body;
                
                // Create product
                const product = await Product.create({
                    name,
                    category,
                    price: parseFloat(price),
                    stock: parseInt(stock || 0)
                });

                // Handle single image upload
                if (req.file) {
                    const imageUrl = getImageBase64(req.file.buffer, req.file.mimetype);
                    await ProductImage.create({
                        imageUrl,
                        productId: product.id
                    });
                }

                // Handle additional base64 images
                const additionalImages = req.body.images || [];
                if (additionalImages.length > 0) {
                    const productImages = additionalImages.map(imageUrl => ({
                        imageUrl,
                        productId: product.id
                    }));
                    await ProductImage.bulkCreate(productImages);
                }

                const productWithImages = await Product.findByPk(product.id, {
                    include: [ProductImage]
                });

                generateResponse(res, 201, 'Product created successfully', productWithImages.toPublicJSON());
            } catch (error) {
                console.error('Error in createProduct:', error);
                generateResponse(res, 500, 'Error creating product', { error: error.message });
            }
        });
    } catch (error) {
        console.error('Error in upload handling:', error);
        generateResponse(res, 500, 'Error handling upload', { error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: products } = await Product.findAndCountAll({
            include: [ProductImage],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        generateResponse(res, 200, 'Products retrieved successfully', {
            products: products.map(product => product.toPublicJSON()),
            pagination: {
                total: count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        generateResponse(res, 500, 'Error retrieving products', { error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return generateResponse(res, 400, err.message);
            }

            try {
                const { id } = req.params;
                const { name, category, price, stock } = req.body;

                const product = await Product.findByPk(id);
                if (!product) {
                    return generateResponse(res, 404, 'Product not found');
                }

                // Update product details
                await product.update({
                    name: name || product.name,
                    category: category || product.category,
                    price: price ? parseFloat(price) : product.price,
                    stock: stock ? parseInt(stock) : product.stock
                });

                // Handle new image if uploaded
                if (req.file) {
                    const imageUrl = getImageBase64(req.file.buffer, req.file.mimetype);
                    await ProductImage.create({
                        imageUrl,
                        productId: id
                    });
                }

                // Handle additional base64 images
                const additionalImages = req.body.images || [];
                if (additionalImages.length > 0) {
                    const productImages = additionalImages.map(imageUrl => ({
                        imageUrl,
                        productId: id
                    }));
                    await ProductImage.bulkCreate(productImages);
                }

                const updatedProduct = await Product.findByPk(id, {
                    include: [ProductImage]
                });

                generateResponse(res, 200, 'Product updated successfully', updatedProduct.toPublicJSON());
            } catch (error) {
                console.error('Error in updateProduct:', error);
                generateResponse(res, 500, 'Error updating product', { error: error.message });
            }
        });
    } catch (error) {
        console.error('Error in upload handling:', error);
        generateResponse(res, 500, 'Error handling upload', { error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByPk(id);
        
        if (!product) {
            return generateResponse(res, 404, 'Product not found');
        }

        // Delete the product (this will automatically delete associated images due to CASCADE)
        await product.destroy();
        
        generateResponse(res, 200, 'Product and associated images deleted successfully');
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        generateResponse(res, 500, 'Error deleting product', { error: error.message });
    }
};

exports.deleteProductImage = async (req, res) => {
    try {
        const { productId, imageId } = req.params;

        // Find the image
        const image = await ProductImage.findOne({
            where: {
                id: imageId,
                productId: productId
            }
        });

        if (!image) {
            return generateResponse(res, 404, 'Product image not found');
        }

        // Delete the image
        await image.destroy();

        // Return the updated product with remaining images
        const updatedProduct = await Product.findByPk(productId, {
            include: [ProductImage]
        });

        if (!updatedProduct) {
            return generateResponse(res, 404, 'Product not found');
        }

        generateResponse(res, 200, 'Product image deleted successfully', updatedProduct.toPublicJSON());
    } catch (error) {
        console.error('Error in deleteProductImage:', error);
        generateResponse(res, 500, 'Error deleting product image', { error: error.message });
    }
};