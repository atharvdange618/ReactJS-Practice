// routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

router.get("/", (req, res) => {
    res.render('index');
});

router.post('/register', async (req, res) => {
    const { username, name, email, password, confirm_password, address, usertype } = req.body;
    const { profilepic } = req.files;

    // Validate password and confirm_password
    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadDir = path.join(__dirname, '../public/images/uploads/');

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create a unique filename for the uploaded file
    const uniqueFilename = uuidv4() + '-' + profilepic.name;

    // Move the uploaded file to the upload directory
    profilepic.mv(path.join(uploadDir, uniqueFilename), async (err) => {
        if (err) {
            console.error('Error moving file:', err);
            return res.status(500).json({ error: 'Error uploading file.' });
        }

        // Construct the URL of the uploaded image
        const imageUrl = `http://localhost:3000/images/uploads/${uniqueFilename}`;

        try {
            const user = await User.create({
                username,
                name,
                email,
                password: hashedPassword,
                address,
                usertype,
                imageUrl
            });

            res.render('profile', { username, name, email, address, usertype, imageUrl });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Error registering user' });
        }
    });
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
