// middleware/auth.js
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user, options = {}) => {
    if (!user || !user.id || !user.email) {
        throw new Error('Invalid user object');
    }

    const payload = { id: user.id, email: user.email, ...options.payload };
    const tokenOptions = { expiresIn: '1h', ...options.tokenOptions };

    return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.uid; // Extract token from the 'uid' cookie

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { generateToken, verifyToken };
