// authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModal');

const COOKIE_NAME = process.env.AUTH_COOKIE || 'geekcrm_auth_token';

exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Verify the token using JWT secret
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
      }

      const admin = await Admin.findByPk(decoded.aid);
      
      if (!admin) {
        return res.status(401).json({ success: false, message: "Admin not found" });
      }

      // Attach the admin data to the request object
      req.user = {
        id: admin.id,
        email: admin.email
      };

      next();
    });
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
