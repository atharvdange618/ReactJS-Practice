const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        res.status(200).json({ message: 'User logged in successfully', user: user });
      } else {
        res.status(500).json({ message: 'User not found', user });
      }
    } else {
      res.status(500).json({ message: 'User not found', user });
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(url + "/login");
}

router.get("*", (req, res) => {
  res.render('404');
});
module.exports = router;