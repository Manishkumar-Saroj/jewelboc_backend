const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactUs = sequelize.define('ContactUs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    describe: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true
});

// Instance method to get public data
ContactUs.prototype.toPublicJSON = function() {
    const values = { ...this.get() };
    
    // If the contact has associated images, transform them too
    if (values.ContactImages) {
        values.images = values.ContactImages.map(image => ({
            id: image.id,
            imageUrl: image.imageUrl
        }));
        delete values.ContactImages;
    }
    
    return values;
};

module.exports = ContactUs;