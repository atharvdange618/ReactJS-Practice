// controller.js

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
    // Logic to handle editing user profile
    res.send('User profile edited');
};

// Function to handle adding a new user form
exports.addUserForm = async (req, res) => {
    // Logic to handle adding a new user form
    res.send('New user form added');
};

exports.logout = (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        // Clear authentication token (JWT) cookie
        res.clearCookie('connect.sid');
        res.clearCookie('uid');
        // Redirect to login page
        res.redirect('/login');
    });
}