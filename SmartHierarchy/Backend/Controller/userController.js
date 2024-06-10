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
exports.addNewUser = async (req, res) => {
    const { newUsername, newName, newEmail, newPassword, addedByUsername } = req.body;

    try {
        // Check if the user adding the new user exists
        const addedByUser = await User.findOne({ username: addedByUsername });
        if (!addedByUser) {
            return res.status(404).json({ message: 'User adding the new user not found' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Generate a salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Create a new user object
        const newUser = new User({
            username: newUsername,
            name: newName,
            email: newEmail,
            password: hashedPassword,
            usertype: 'user',
            addedAt: Date.now(),
            addedBy: addedByUser._id // Reference to the user who added this new user
        });

        // Save the new user to the database
        await newUser.save();

        // Update the addedByUser to increment the userAdded count
        addedByUser.usersAdded.push(newUser._id);
        await addedByUser.save();

        // Send response indicating success
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
}