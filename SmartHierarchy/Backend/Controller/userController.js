const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

// Function to handle access to user panel
exports.userPanel = (req, res) => {
    // Retrieve user data from session
    const userData = req.session.user;
    if (userData) {
        res.render('user', { userData }); // Pass userData as an object
    } else {
        // Handle case where user data is not available
        res.status(404).send('User data not found');
    };
}

// Function to handle editing user profile
exports.editUser = async (req, res) => {
    const userId = req.user.id;
    const { name, email, address, usertype } = req.body;
    let updateData = { name, email, address, usertype };

    try {
        // Handle profile picture upload
        if (req.files && req.files.profilepic) {
            const profilePic = req.files.profilepic;
            const uploadPath = path.join(__dirname, '../public/images/uploads/', profilePic.name);

            // Save the file to the uploads directory
            profilePic.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Failed to upload profile picture' });
                }
            });

            updateData.imageUrl = `/images/uploads/${profilePic.name}`;
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

// Function to handle adding a new user form
exports.addUserForm = async (req, res) => {
    // Logic to handle adding a new user form
    res.send('New user form added');
};