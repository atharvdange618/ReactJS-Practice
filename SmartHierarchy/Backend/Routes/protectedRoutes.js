const express = require('express')
const router = express.Router()
const { verifyToken } = require('../Middleware/auth')
const adminController = require('../Controller/adminController')
const userController = require('../Controller/userController')

// router.use(verifyToken)

// Administrator panel route
router.get('/administrator', adminController.adminPanel);

// User list route
router.get('/administrator/userlist', adminController.getUserList);

// User tree route
router.get('/administrator/usertree/:username', adminController.userTree);

// Edit administrator profile route
router.patch('/administrator/edit', adminController.editAdministrator);

// Delete user route
router.delete('/administrator/delete/:username', adminController.deleteUser);

// Get Admin Data
router.get('/administrator/:username', adminController.getAdminData);

// User panel route
router.get('/user', userController.userPanel);

// Get User Data
router.get("/user/:username", userController.getUserData)

// Edit user profile route
router.patch('/user/edit', userController.editUser);

// Add user form route
router.post('/user/addNewUser', userController.addNewUser);

// User route for usertree
router.get('/user/usertree', userController.userTree);

// Logout route
router.get('/logout', (req, res) => {
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
});

module.exports = router;