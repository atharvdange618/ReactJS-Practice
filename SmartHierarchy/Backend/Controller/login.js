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
                const responseData = {
                    username,
                    usertype,
                    imageUrl,
                    token // Include token in the response data
                };

                // Respond with JSON data instead of redirecting
                if (usertype === 'admin') {
                    const users = await User.find({}, { password: 0 });
                    responseData.users = users; // Include users data in the response for admin
                    res.status(200).json(responseData);
                } else {
                    res.status(200).json(responseData);
                }
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
}
