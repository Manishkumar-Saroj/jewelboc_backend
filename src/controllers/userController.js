const User = require('../models/userModal');
const { generateResponse } = require('../utils/responseUtils');

exports.createUser = async (req, res) => {
    try {
        const { fullName, email, phoneNo, address } = req.body;

        // Check if user with same email already exists
        if (email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return generateResponse(res, 400, 'User with this email already exists');
            }
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            phoneNo,
            address
        });

        generateResponse(res, 201, 'User created successfully', user.toPublicJSON());
    } catch (error) {
        console.error('Error in createUser:', error);
        generateResponse(res, 500, 'Error creating user', { error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        generateResponse(res, 200, 'Users retrieved successfully', 
            users.map(user => user.toPublicJSON())
        );
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        generateResponse(res, 500, 'Error retrieving users', { error: error.message });
    }
};