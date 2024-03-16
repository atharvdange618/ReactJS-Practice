const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const url = "http://localhost:4000";

/* GET home page. */
router.get('/', function (req, res) {
  console.log(req.session)
  res.render('index', { title: 'Server' });
});

const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hashedPassword, userType });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        req.session.user = user; // Store user in session
        res.status(200).json({ message: 'User logged in successfully', user });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during login.');
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred during logout.');
    } else {
      res.redirect(url + '/login');
    }
  });
});

// Profile API endpoint (protected)
router.get('/api/profile', checkAuth, (req, res) => {
  const { username, userType } = req.session.user;
  res.json({ username, userType });
});

router.get("*", (req, res) => {
  res.render('404');
});

module.exports = router;