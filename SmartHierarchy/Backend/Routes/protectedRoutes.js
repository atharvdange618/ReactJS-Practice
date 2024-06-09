const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middleware/auth');
const controller = require('../Controller/controller');

// Apply JWT token verification middleware to all routes in this file
router.use(verifyToken);

// Administrator panel route
router.get('/administrator', controller.adminPanel);

// User list route
router.get('/administrator/userlist', controller.getUserList);

// User tree route
router.get('/administrator/user/tree', controller.userTree);

// Edit administrator profile route
router.patch('/administrator/edit', controller.editAdministrator);

// User panel route
router.get('/user', controller.userPanel);

// Edit user profile route
router.patch('/user/edit', controller.editUser);

// Add user form route
router.post('/user/addUserForm', controller.addUserForm);

// Logout route
router.get('/logout', controller.logout);

module.exports = router;