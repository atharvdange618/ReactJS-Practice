const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

const createDirectoryIfNotExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const moveUploadedFile = (file, targetPath) => {
    return new Promise((resolve, reject) => {
        file.mv(targetPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const validateUserData = ({ username, name, email, password, confirmPassword, address, usertype }) => {
    if (!username || !name || !email || !password || !confirmPassword || !address || !usertype) {
        throw new Error('All fields are required');
    }
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }
};

module.exports = async (req, res) => {
    try {
        const { username, name, email, password, confirmPassword, address, usertype } = req.body;
        const profilepic = req.files.profilepic;

        // Validate user input
        validateUserData(req.body);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const uploadDir = path.join(__dirname, '../public/images/uploads/');
        createDirectoryIfNotExists(uploadDir);

        // Create a unique filename for the uploaded file
        const uniqueFilename = `${uuidv4()}-${profilepic.name}`;
        const targetPath = path.join(uploadDir, uniqueFilename);

        // Move the uploaded file to the upload directory
        await moveUploadedFile(profilepic, targetPath);

        // Construct the URL of the uploaded image
        const imageUrl = `http://localhost:3000/images/uploads/${uniqueFilename}`;

        // Create the user in the database
        const user = await User.create({
            username,
            name,
            email,
            password: hashedPassword,
            address,
            usertype,
            imageUrl
        });

        // Respond with the user data (excluding password)
        res.status(201).json({ username, name, email, address, usertype, imageUrl });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: error.message });
    }
};
