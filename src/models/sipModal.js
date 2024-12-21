const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tenure = require('./tenureModal');

const Sip = sequelize.define('Sip', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    planName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    interestRate: {
        type: DataTypes.DECIMAL(5, 2),  // Allows values like 12.50
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
    tenureMonths: {
        type: DataTypes.TEXT,  // Changed from JSON to TEXT
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('tenureMonths');
            return rawValue ? rawValue.split(',').map(Number) : [];
        },
        set(value) {
            if (Array.isArray(value)) {
                this.setDataValue('tenureMonths', value.join(','));
            } else {
                this.setDataValue('tenureMonths', value);
            }
        }
    }
}, {
    timestamps: true
});

// Instance method to get public data
Sip.prototype.toPublicJSON = function() {
    const values = { ...this.get() };
    // Ensure tenureMonths is always an array
    values.tenureMonths = values.tenureMonths || [];
    return values;
};

module.exports = Sip;