var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
  console.log(req.session)
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username })
    if (user) {
      const same = await bcrypt.compare(user.password, password)
    } else {
      res.redirect('http://localhost:4000/')
    }
  } catch (error) {

  }

  res.redirect("/profile", { username: username })
})

module.exports = router;