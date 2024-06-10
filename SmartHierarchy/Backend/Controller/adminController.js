const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

// Function to handle access to administrator panel
exports.adminPanel = (req, res) => {
    // Retrieve user data from session
    const userData = req.session.user;
    if (userData) {
        res.render('admin', { userData }); // Pass userData as an object
    } else {
        // Handle case where user data is not available
        res.status(404).send('User data not found');
    };
}

// Function to get user list (assuming this retrieves users from the database)
exports.getUserList = async (req, res) => {
    try {
        // Check if the user making the request is an administrator
        if (req.session.user.usertype !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only administrators can access this resource' });
        }

        // Fetch the list of users from the database
        const users = await User.find({}, { password: 0 }); // Exclude password field from the results

        // Return the list of users in the response
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user list' });
    }
};

// Function to handle editing administrator profile
exports.editAdministrator = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
    try {
        const username = req.params.username;

        // Find and delete the user by username
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to handle access to user tree (assuming this retrieves user tree data)
exports.userTree = async (req, res) => {
    // Logic to retrieve and render user tree data
    res.send('User tree');
};