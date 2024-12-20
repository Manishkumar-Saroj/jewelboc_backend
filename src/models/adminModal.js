const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    resetTokenExp: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true, // Keeps createdAt and updatedAt
    hooks: {
        beforeCreate: async (admin) => {
            if (admin.password) {
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(admin.password, salt);
            }
        },
        beforeUpdate: async (admin) => {
            if (admin.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(admin.password, salt);
            }
        }
    }
});

// Instance method to check password
Admin.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Instance method to get public profile
Admin.prototype.toPublicJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    delete values.resetToken;
    delete values.resetTokenAt;
    delete values.resetTokenExp;
    return values;
};

module.exports = Admin;
