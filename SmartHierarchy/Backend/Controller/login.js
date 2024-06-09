const User = require('../Model/user');
const { generateToken } = require("../Middleware/auth");
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            const { username, usertype, password: hashedPassword, imageUrl } = user;
            const same = await bcrypt.compare(password, hashedPassword);
            if (same) {
                const token = generateToken(user);
                const cookieOptions = {
                    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                    secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // Ensures the cookie is only sent over HTTPS
                }
                res.cookie("uid", token, cookieOptions);
                if (usertype === 'admin') {
                    const users = await User.find({}, { password: 0 });
                    // Store user data in session
                    req.session.user = { username, usertype, imageUrl, users };
                    res.redirect('/auth/administrator');
                } else {
                    // Store user data in session
                    req.session.user = { username, usertype, imageUrl };
                    res.redirect('/auth/user');
                }
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during login.');
    }
}
