// middlewares/auth.js
const { validateToken } = require('../services/authentication'); // Adjust the path to your authentication service

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayLoad = validateToken(tokenCookieValue);
      req.user = userPayLoad;
    } catch (error) {
      console.error('Invalid token:', error);
    }

    next();
  };
}

module.exports = { checkForAuthCookie };
