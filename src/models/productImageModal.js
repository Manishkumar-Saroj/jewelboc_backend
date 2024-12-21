const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: true
});

// Define the relationship
const Product = require('./productModal');
Product.hasMany(ProductImage, { 
    foreignKey: 'productId',
    onDelete: 'CASCADE'
});
ProductImage.belongsTo(Product, { 
    foreignKey: 'productId',
    onDelete: 'CASCADE'
});

module.exports = ProductImage;