const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

// Function to handle access to user panel
exports.userPanel = (req, res) => {
    // Retrieve user data from session
    const userData = req.session.user;
    if (userData) {
        res.json(userData); // Send userData as JSON
    } else {
        // Handle case where user data is not available
        res.status(404).json({ message: 'User data not found' });
    }
};

exports.getUserData = async (req, res) => {
    const username = req.params.username; // Use req.params.username to get the username parameter

    try {
        const userdata = await User.findOne({ username }); // Find user by username

        if (!userdata) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }

        const { username: foundUsername, usertype, imageUrl } = userdata;

        res.status(200).json({ username: foundUsername, usertype, imageUrl }); // Return user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Failed to fetch user data' }); // Handle server error
    }
};

// Function to handle editing user profile
exports.editUser = async (req, res) => {
    const { name, email, address, usertype } = req.body;
    let updateData = { name, email, address, usertype };
    const data = await User.findOne({ name })
    const userId = data.id

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
            const imageUrl = `http://localhost:3000/images/uploads/${profilePic.name}`;

            updateData.imageUrl = imageUrl;
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
};

exports.userTree = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).populate('usersAdded').exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const buildTree = (user) => {
            return {
                id: user._id,
                username: user.username,
                profilePic: user.imageUrl,
                children: user.usersAdded.map(buildTree)
            };
        };

        const userTree = buildTree(user);
        res.json({ username: user.username, tree: [userTree] });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
