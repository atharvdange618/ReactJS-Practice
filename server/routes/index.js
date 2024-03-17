const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');
const Post = require("../models/posts");
const fileUpload = require('express-fileupload');
const path = require('path');
const uploadDir = path.join(__dirname, '../public/images/uploads');
const { v4: uuidv4 } = require('uuid');

// Enable file upload middleware
router.use(fileUpload());

/* GET home page. */
router.get('/', function (req, res) {
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

router.post('/upload', (req, res) => {
  try {
    const { username, fileCaption } = req.body;
    const { file } = req.files;

    if (!username || !fileCaption || !file) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const uploadDir = path.join(__dirname, '../public/images/uploads');

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create a unique filename for the uploaded file
    const uniqueFilename = uuidv4() + '-' + file.name;

    // Move the uploaded file to the upload directory
    file.mv(path.join(uploadDir, uniqueFilename), async (err) => {
      if (err) {
        console.error('Error moving file:', err);
        return res.status(500).json({ error: 'Error uploading file.' });
      }

      // Construct the URL of the uploaded image
      const imageUrl = `http://localhost:3000/images/uploads/${uniqueFilename}`;

      // Create a new post document in the database
      try {
        const post = await Post.create({
          imageText: fileCaption,
          image: imageUrl,
          user: username
        });

        res.status(200).json({ message: 'File uploaded successfully', post });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post.' });
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading file.' });
  }
});

router.get('/images', async (req, res) => {
  try {
    // Fetch all posts with images from the database
    const postsWithImages = await Post.find({ image: { $exists: true, $ne: null } }, { image: 1 });

    // Extract image URLs from the posts
    const images = postsWithImages.map(post => ({ url: post.image }));

    res.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("*", (req, res) => {
  res.render('404');
});

module.exports = router;