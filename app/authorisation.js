const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Same as in userController.js

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).json({ status: false, message: 'Invalid token.' });
  }
};

module.exports = authenticate;
