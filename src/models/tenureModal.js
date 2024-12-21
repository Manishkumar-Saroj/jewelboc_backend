const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tenure = sequelize.define('Tenure', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    months: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,  // Ensure months is at least 1
            isInt: true  // Ensure it's an integer
        }
    }
}, {
    timestamps: true
});

// Instance method to get public data
Tenure.prototype.toPublicJSON = function() {
    return { ...this.get() };
};

module.exports = Tenure;