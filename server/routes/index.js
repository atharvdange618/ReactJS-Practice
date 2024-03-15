const express = require('express');
const router = express.Router();
const User = require('../models/user');
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(User.authenticate()));
const url = "http://localhost:4000"

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Server' });
  console.log(req.session);
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;
    const user = await User.create({ username, email, password, userType });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post("/login", passport.authenticate('local', {
  successRedirect: url + "/profile",
  failureRedirect: url
}));

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = router;