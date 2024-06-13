const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../Model/user');

// Function to handle access to administrator panel
exports.adminPanel = (req, res) => {
    const userData = req.session.user;
    if (userData) {
        res.json(userData);
    } else {
        res.status(404).json({ message: 'User data not found' });
    }
};

// Function to get user list
exports.getUserList = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user list' });
    }
};

// Function to handle editing administrator profile
exports.editAdministrator = async (req, res) => {
    const userId = req.user.id;
    const { name, email, address, usertype, password } = req.body;
    let updateData = { name, email, address, usertype };

    try {
        if (req.files && req.files.profilepic) {
            const profilePic = req.files.profilepic;
            const uploadPath = path.join(__dirname, '../public/images/uploads/', profilePic.name);

            profilePic.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Failed to upload profile picture' });
                }
            });

            const imageUrl = `http://localhost:3000/images/uploads/${profilePic.name}`;
            updateData.imageUrl = imageUrl;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
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

// Function to handle access to user tree
exports.userTree = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).populate('usersAdded').exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const buildTree = (user) => ({
            id: user._id,
            username: user.username,
            profilePic: user.imageUrl,
            children: user.usersAdded.map(buildTree)
        });

        const userTree = buildTree(user);
        res.json({ username: user.username, tree: [userTree] });
    } catch (error) {
        console.error('Error fetching user tree:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get admin data
exports.getAdminData = async (req, res) => {
    const { username } = req.params;

    try {
        const userdata = await User.findOne({ username });

        if (userdata.usertype === 'user') {
            return res.json({ message: "this user is not admin" })
        }

        if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username: foundUsername, usertype, imageUrl } = userdata;
        res.status(200).json({ username: foundUsername, usertype, imageUrl });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
};
