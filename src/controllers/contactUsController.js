const ContactUs = require('../models/contactUsModal');
const ContactImage = require('../models/contactImageModal');
const { generateResponse } = require('../utils/responseUtils');
const { upload, getImageBase64 } = require('../utils/imageHandler');

exports.createContact = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return generateResponse(res, 400, err.message);
            }

            try {
                const { firstName, lastName, email, phoneNo, describe } = req.body;
                
                // Create contact
                const contact = await ContactUs.create({
                    firstName,
                    lastName,
                    email,
                    phoneNo,
                    describe,
                    isRead: false
                });

                // Handle single image upload
                if (req.file) {
                    const imageUrl = getImageBase64(req.file.buffer, req.file.mimetype);
                    await ContactImage.create({
                        imageUrl,
                        contactId: contact.id
                    });
                }

                // Handle additional base64 images
                const additionalImages = req.body.images || [];
                if (additionalImages.length > 0) {
                    const contactImages = additionalImages.map(imageUrl => ({
                        imageUrl,
                        contactId: contact.id
                    }));
                    await ContactImage.bulkCreate(contactImages);
                }

                const contactWithImages = await ContactUs.findByPk(contact.id, {
                    include: [ContactImage]
                });

                generateResponse(res, 201, 'Contact message sent successfully', contactWithImages.toPublicJSON());
            } catch (error) {
                console.error('Error in createContact:', error);
                generateResponse(res, 500, 'Error sending contact message', { error: error.message });
            }
        });
    } catch (error) {
        console.error('Error in upload handling:', error);
        generateResponse(res, 500, 'Error handling upload', { error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        
        const contact = await ContactUs.findByPk(id, {
            include: [ContactImage]
        });
        
        if (!contact) {
            return generateResponse(res, 404, 'Contact message not found');
        }

        await contact.update({ isRead: true });
        
        generateResponse(res, 200, 'Contact message marked as read', contact.toPublicJSON());
    } catch (error) {
        console.error('Error in markAsRead:', error);
        generateResponse(res, 500, 'Error updating contact message', { error: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        
        const contact = await ContactUs.findByPk(id);
        
        if (!contact) {
            return generateResponse(res, 404, 'Contact message not found');
        }

        await contact.destroy();
        
        generateResponse(res, 200, 'Contact message deleted successfully');
    } catch (error) {
        console.error('Error in deleteContact:', error);
        generateResponse(res, 500, 'Error deleting contact message', { error: error.message });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const { page = 1, limit = 10, isRead } = req.query;
        const offset = (page - 1) * limit;

        // Build where clause based on isRead filter
        const whereClause = {};
        if (isRead !== undefined) {
            whereClause.isRead = isRead === 'true';
        }

        const { count, rows: contacts } = await ContactUs.findAndCountAll({
            where: whereClause,
            include: [ContactImage],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        generateResponse(res, 200, 'Contact messages retrieved successfully', {
            contacts: contacts.map(contact => contact.toPublicJSON()),
            pagination: {
                total: count,
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllContacts:', error);
        generateResponse(res, 500, 'Error retrieving contact messages', { error: error.message });
    }
};