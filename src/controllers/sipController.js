const Sip = require('../models/sipModal');
const Tenure = require('../models/tenureModal');
const { generateResponse } = require('../utils/responseUtils');

exports.createSip = async (req, res) => {
    try {
        const { planName, interestRate, minAmount, maxAmount, tenureMonths } = req.body;

        // Ensure tenureMonths is an array
        const monthsArray = Array.isArray(tenureMonths) ? tenureMonths : [];

        // Validate tenure months exist in Tenure table
        if (monthsArray.length > 0) {
            const existingTenures = await Tenure.findAll({
                where: {
                    months: monthsArray
                }
            });

            if (existingTenures.length !== monthsArray.length) {
                return generateResponse(res, 400, 'Some selected tenure months do not exist');
            }
        }

        const sip = await Sip.create({
            planName,
            interestRate,
            minAmount,
            maxAmount,
            tenureMonths: monthsArray // Will be automatically converted to comma-separated string
        });

        generateResponse(res, 201, 'SIP plan created successfully', sip.toPublicJSON());
    } catch (error) {
        console.error('Error in createSip:', error);
        generateResponse(res, 500, 'Error creating SIP plan', { error: error.message });
    }
};

exports.getAllSips = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: sips } = await Sip.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        generateResponse(res, 200, 'SIP plans retrieved successfully', {
            sips: sips.map(sip => sip.toPublicJSON()),
            pagination: {
                total: count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllSips:', error);
        generateResponse(res, 500, 'Error retrieving SIP plans', { error: error.message });
    }
};

exports.deleteSip = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sip = await Sip.findByPk(id);
        
        if (!sip) {
            return generateResponse(res, 404, 'SIP plan not found');
        }

        await sip.destroy();
        
        generateResponse(res, 200, 'SIP plan deleted successfully');
    } catch (error) {
        console.error('Error in deleteSip:', error);
        generateResponse(res, 500, 'Error deleting SIP plan', { error: error.message });
    }
};