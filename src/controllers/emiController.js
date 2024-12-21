const Emi = require('../models/emiModal');
const Tenure = require('../models/tenureModal');
const { generateResponse } = require('../utils/responseUtils');

exports.createEmi = async (req, res) => {
    try {
        const { loanType, minAmount, maxAmount, minTenure, maxTenure, baseInterestRate } = req.body;

        // Validate tenure exists in Tenure table
        if (minTenure && maxTenure) {
            const existingTenures = await Tenure.findAll({
                where: {
                    months: [minTenure, maxTenure]
                }
            });

            if (existingTenures.length !== 2) {
                return generateResponse(res, 400, 'Selected tenure months do not exist');
            }

            // Validate min tenure is less than max tenure
            if (minTenure > maxTenure) {
                return generateResponse(res, 400, 'Minimum tenure cannot be greater than maximum tenure');
            }
        }

        const emi = await Emi.create({
            loanType,
            minAmount,
            maxAmount,
            minTenure,
            maxTenure,
            baseInterestRate
        });

        generateResponse(res, 201, 'EMI plan created successfully', emi.toPublicJSON());
    } catch (error) {
        console.error('Error in createEmi:', error);
        generateResponse(res, 500, 'Error creating EMI plan', { error: error.message });
    }
};

exports.getAllEmis = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: emis } = await Emi.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        generateResponse(res, 200, 'EMI plans retrieved successfully', {
            emis: emis.map(emi => emi.toPublicJSON()),
            pagination: {
                total: count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllEmis:', error);
        generateResponse(res, 500, 'Error retrieving EMI plans', { error: error.message });
    }
};

exports.deleteEmi = async (req, res) => {
    try {
        const { id } = req.params;
        
        const emi = await Emi.findByPk(id);
        
        if (!emi) {
            return generateResponse(res, 404, 'EMI plan not found');
        }

        await emi.destroy();
        
        generateResponse(res, 200, 'EMI plan deleted successfully');
    } catch (error) {
        console.error('Error in deleteEmi:', error);
        generateResponse(res, 500, 'Error deleting EMI plan', { error: error.message });
    }
};