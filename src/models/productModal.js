const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    timestamps: true
});

// Instance method to get public profile
Product.prototype.toPublicJSON = function() {
    const values = { ...this.get() };
    
    // If the product has associated images, transform them too
    if (values.ProductImages) {
        values.images = values.ProductImages.map(image => ({
            id: image.id,
            imageUrl: image.imageUrl
        }));
        delete values.ProductImages; // Remove the original ProductImages array
    }
    
    return values;
};

module.exports = Product;