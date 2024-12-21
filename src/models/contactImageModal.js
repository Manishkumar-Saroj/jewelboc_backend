const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactImage = sequelize.define('ContactImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    contactId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ContactUs',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: true
});

// Define the relationship
const ContactUs = require('./contactUsModal');
ContactUs.hasMany(ContactImage, { 
    foreignKey: 'contactId',
    onDelete: 'CASCADE'
});
ContactImage.belongsTo(ContactUs, { 
    foreignKey: 'contactId',
    onDelete: 'CASCADE'
});

module.exports = ContactImage;