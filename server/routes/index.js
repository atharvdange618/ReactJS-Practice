const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const url = "http://localhost:4000";

/* GET home page. */
router.get(url, function (req, res) {
  console.log(req.session)
  res.render('index', { title: 'Server' });
});

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
      const { username, userType } = user;
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        if (userType === 'admin') {
          // If the user is an admin, fetch the list of all users from MongoDB
          const users = await User.find({}, { password: 0 }); // Exclude password field
          res.json({ username, userType, users });
        } else {
          // If the user is not an admin, send the user's own profile data
          res.status(200).json({ username, userType });
        }
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

router.post("/upload", upload.single('file'), async function (req, res) {
  if (!req.file) {
    return res.status(404).send("no files were given");
  }
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    userid: user._id
  });

  user.posts.push(post._id);
  await user.save();
  res.status(200).send("success");
});

router.get("*", (req, res) => {
  res.render('404');
});

module.exports = router;