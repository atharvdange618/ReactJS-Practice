// routes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../Controller/controller');

// Home page route
router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Registration page route
router.get('/register', (req, res) => {
    res.send('Registration page');
});

// Login route (User login)
router.post('/login', passport.authenticate('local'), controller.login);

// Login route (Administrator login)
router.post('/login/administrator', passport.authenticate('local'), controller.adminLogin);

module.exports = router;
