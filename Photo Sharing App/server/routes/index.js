//import modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');
const Post = require("../models/posts");
const fileUpload = require('express-fileupload');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Enable file upload middleware
router.use(fileUpload());

/* GET home page. */
router.get('/', function (req, res) {
  console.log(req.session)
  res.render('index', { title: 'Server' });
});

/*
  - Route for user registration
  - Receives the post request from client
  - Creates a new user with the given username and password
  - Bcrypt is used to hash passwords
 */
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

/*
  - Route for user login
  - Extracts the username and password from the request body
  - If the user is found in the db 
  - Uses the bcrypt's compare function to compare passwords
  - Checks if the user is admin and if he is then sends the list of users with their username and user types
  - If the user is a normal user then just sends his username and 
 */
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

/*
  - Route for image upload
  - Uses File Upload package to handle file upload
  - Extracts the username and file caption from request body and image file from the files object added to the request body
  - Creates unique filename using the uuid package
  - Uses the MV method to move uploaded files to the correct location
  - Creates the Url for the image and then creates a record for it in the posts db
 */
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

/*
  - Route for fetching images
  - Fetches images from the posts db and maps them to the image object
  - Returns the image object as a response
 */
router.get('/images', async (req, res) => {
  try {
    // Fetch all posts with images from the database
    const postsWithImages = await Post.find(
      { image: { $exists: true, $ne: null } },
      { image: 1, imageText: 1 }
    );

    // Extract image URLs and associated text from the posts
    const images = postsWithImages.map(post => ({
      url: post.image,
      text: post.imageText
    }));

    res.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/images/:username', async (req, res) => {
  try {
    // Find the user by their username
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch posts with images associated with the user's ID
    const postsWithImages = await Post.find(
      { user: user.username, image: { $exists: true, $ne: null } },
      { image: 1, imageText: 1 }
    );

    // Extract image URLs and associated text from the posts
    const images = postsWithImages.map(post => ({
      url: post.image,
      text: post.imageText,
      user: post.user
    }));

    res.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Wildcard route for wrong paths
router.get("*", (req, res) => {
  res.render('404');
});

module.exports = router;