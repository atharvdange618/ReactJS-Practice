// routes.js
const express = require('express');
const router = express.Router();
const registerRouter = require('../Controller/register');
const loginRouter = require('../Controller/login');

router.get("/", (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', registerRouter);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginRouter);

module.exports = router;