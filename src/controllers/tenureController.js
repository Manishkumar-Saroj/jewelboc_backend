const { Op } = require('sequelize');
const Tenure = require('../models/tenureModal');
const { generateResponse } = require('../utils/responseUtils');

exports.createTenure = async (req, res) => {
    try {
        const { months } = req.body;

        if (!months || !Number.isInteger(Number(months)) || Number(months) < 1) {
            return generateResponse(res, 400, 'Please provide a valid number of months (minimum 1)');
        }

        // Check if tenure with same months already exists
        const existingTenure = await Tenure.findOne({ where: { months } });
        if (existingTenure) {
            return generateResponse(res, 400, 'Tenure with these months already exists');
        }

        const tenure = await Tenure.create({ months });
        generateResponse(res, 201, 'Tenure created successfully', tenure.toPublicJSON());
    } catch (error) {
        console.error('Error in createTenure:', error);
        generateResponse(res, 500, 'Error creating tenure', { error: error.message });
    }
};

exports.getAllTenures = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: tenures } = await Tenure.findAndCountAll({
            order: [['months', 'ASC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        generateResponse(res, 200, 'Tenures retrieved successfully', {
            tenures: tenures.map(tenure => tenure.toPublicJSON()),
            pagination: {
                total: count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllTenures:', error);
        generateResponse(res, 500, 'Error retrieving tenures', { error: error.message });
    }
};

exports.updateTenure = async (req, res) => {
    try {
        const { id } = req.params;
        const { months } = req.body;

        if (!months || !Number.isInteger(Number(months)) || Number(months) < 1) {
            return generateResponse(res, 400, 'Please provide a valid number of months (minimum 1)');
        }

        const tenure = await Tenure.findByPk(id);
        
        if (!tenure) {
            return generateResponse(res, 404, 'Tenure not found');
        }

        // Check if another tenure with the same months exists
        const existingTenure = await Tenure.findOne({ 
            where: { 
                months,
                id: { [Op.ne]: id } // Exclude current tenure from check
            } 
        });
        
        if (existingTenure) {
            return generateResponse(res, 400, 'Another tenure with these months already exists');
        }

        await tenure.update({ months });
        
        generateResponse(res, 200, 'Tenure updated successfully', tenure.toPublicJSON());
    } catch (error) {
        console.error('Error in updateTenure:', error);
        generateResponse(res, 500, 'Error updating tenure', { error: error.message });
    }
};

exports.deleteTenure = async (req, res) => {
    try {
        const { id } = req.params;
        
        const tenure = await Tenure.findByPk(id);
        
        if (!tenure) {
            return generateResponse(res, 404, 'Tenure not found');
        }

        await tenure.destroy();
        
        generateResponse(res, 200, 'Tenure deleted successfully');
    } catch (error) {
        console.error('Error in deleteTenure:', error);
        generateResponse(res, 500, 'Error deleting tenure', { error: error.message });
    }
};