// controller.js
const User = require('../Model/user');
const { generateToken } = require("../Middleware/auth");

// Function to handle user login
exports.login = async (req, res) => {
    // If authentication is successful, create a JWT token
    const token = generateToken();
    res.json({ token });
};

exports.register = async (req, res) => {
    const { name,
        email,
        password,
        address,
        usertype,
        profilePic } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
            address,
            usertype,
            profilePic
        });

        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Function to handle admin login
exports.adminLogin = async (req, res) => {
    // If authentication is successful and user is admin, create a JWT token
    if (req.user && req.user.usertype === 'admin') {
        const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Function to handle access to administrator panel
exports.adminPanel = async (req, res) => {
    // Logic to render the administrator panel
    res.send('Welcome to the administrator panel');
};

// Function to get user list (assuming this retrieves users from the database)
exports.getUserList = async (req, res) => {
    const userList = await User.find();
    res.json(userList);
};

// Function to handle access to user tree (assuming this retrieves user tree data)
exports.userTree = async (req, res) => {
    // Logic to retrieve and render user tree data
    res.send('User tree');
};

// Function to handle editing administrator profile
exports.editAdministrator = async (req, res) => {
    // Logic to handle editing administrator profile
    res.send('Administrator profile edited');
};

// Function to handle access to user panel
exports.userPanel = async (req, res) => {
    // Logic to render the user panel
    res.send('Welcome to the user panel');
};

// Function to handle editing user profile
exports.editUser = async (req, res) => {
    // Logic to handle editing user profile
    res.send('User profile edited');
};

// Function to handle adding a new user form
exports.addUserForm = async (req, res) => {
    // Logic to handle adding a new user form
    res.send('New user form added');
};
