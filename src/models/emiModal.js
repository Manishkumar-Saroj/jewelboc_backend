const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emi = sequelize.define('Emi', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    loanType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    minAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    maxAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    minTenure: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    maxTenure: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    baseInterestRate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    }
}, {
    timestamps: true
});

// Instance method to get public data
Emi.prototype.toPublicJSON = function() {
    return { ...this.get() };
};

module.exports = Emi;