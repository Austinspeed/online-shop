const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-key';

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin
    },
    JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
}


function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}


module.exports = {
  generateToken,
  verifyToken
};