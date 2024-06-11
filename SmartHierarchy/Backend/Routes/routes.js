// routes.js
const express = require('express');
const router = express.Router();
const registerRouter = require('../Controller/register');
const loginRouter = require('../Controller/login');

router.get("/", (req, res) => {
    res.send("Home page")
    console.log("Request on backend")
});

router.get('/register', (req, res) => {
    res.send("Register page")
    console.log("Request for registration")
});

router.post('/register', registerRouter);

router.get('/login', (req, res) => {
    res.send("Login page")
    console.log("Request for login")
});

router.post('/login', loginRouter);

module.exports = router;