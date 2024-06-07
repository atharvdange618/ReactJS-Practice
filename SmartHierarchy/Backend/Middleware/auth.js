// middleware/auth.js
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Unauthorized');
        req.user = decoded;
        next();
    });
};

module.exports = { generateToken, verifyToken };
