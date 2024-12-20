// controllers/authController.js
const passport = require('passport');
const { generateToken, setTokenCookie } = require('../utils/jwtHelper');
const { generateResponse } = require('../utils/responseUtils');

const authenticateUser = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('admin-local', { session: false }, (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err);
        return reject(new Error('Authentication error'));
      }
      if (!user) {
        return reject(new Error(info?.message || 'Invalid credentials'));
      }
      resolve(user);
    })(req, res, next);
  });
};

const handleSuccessfulLogin = (res, user) => {
  const rememberMe = user.rememberMe === true;
  const token = generateToken({ aid: user.id }, rememberMe);
  setTokenCookie(res, token, rememberMe);
  const responseData = { admin: user.toPublicJSON() };
  generateResponse(res, 200, 'Admin logged in successfully', responseData);
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return generateResponse(res, 400, 'Email and password are required');
    }
    
    const rememberMe = req.body.rememberMe === true;
    const user = await authenticateUser(req, res, next);
    
    const token = generateToken({ aid: user.id }, rememberMe);
    setTokenCookie(res, token, rememberMe);
    
    const responseData = { admin: user.toPublicJSON() };
    generateResponse(res, 200, 'Admin logged in successfully', responseData);
  } catch (error) {
    generateResponse(res, 401, error.message || 'Invalid credentials');
  }
};

exports.logout = (req, res) => {
  res.clearCookie(process.env.AUTH_COOKIE);
  generateResponse(res, 200, 'Logged out successfully');
};