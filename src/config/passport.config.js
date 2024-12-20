// config/passport.config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/adminModal');

// Local strategy for admin authentication
const adminLocalStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const admin = await Admin.findOne({
            where: { email: email }
        });
        
        if (!admin) {
            return done(null, false, { message: 'Admin not found' });
        }
        
        const isMatch = await admin.validatePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        
        return done(null, admin);
    } catch (error) {
        return done(error);
    }
});

passport.use('admin-local', adminLocalStrategy);

module.exports = passport;
