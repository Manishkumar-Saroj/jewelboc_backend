const jwt = require('jsonwebtoken');

// Generate a JWT token
exports.generateToken = (payload, rememberMe = false) => {
  const expiresIn = rememberMe 
    ? process.env.JWT_REMEMBER_ME_EXPIRES_IN // 15d
    : process.env.JWT_EXPIRES_IN;           // 1d
    
  // Convert the expiration time to seconds for jwt.sign
  const expiresInSeconds = parseInt(rememberMe 
    ? process.env.JWT_REMEMBER_ME_COOKIE_EXPIRES_IN / 1000  
    : process.env.JWT_COOKIE_EXPIRES_IN / 1000);

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresInSeconds });
};

// Set a JWT token as an HTTP-only cookie for user authentication
exports.setTokenCookie = (res, token, rememberMe = false) => {
  const cookieName = process.env.AUTH_COOKIE;
  const expiresIn = parseInt(rememberMe 
    ? process.env.JWT_REMEMBER_ME_COOKIE_EXPIRES_IN  // 15 days in ms
    : process.env.JWT_COOKIE_EXPIRES_IN);           // 1 day in ms

  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.COOKIE_DOMAIN,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'  // More lenient in development
  };
  
  res.cookie(cookieName, token, cookieOptions);
};