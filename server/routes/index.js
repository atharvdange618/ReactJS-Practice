var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Server' });
  console.log(req.session)
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        res.status(202).json({ message: 'Login Successful' });
        console.log(req.session)
      } else {
        console.log("Login failed: Password incorrect")
        //A response to inform the client about incorrect password
        res.status(401).json({ message: 'Login failed: Password incorrect' });
      }
    } else {
      console.log("Login failed: User not found")
      //A response to inform the client about user not found
      res.status(404).json({ message: 'Login failed: User not found' });
    }
  } catch (error) {
    console.log("Error: " + error.message)
    //A response to inform the client about any error that occurred
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
})

module.exports = router;