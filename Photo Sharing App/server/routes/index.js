//import modules
const express = require('express');
const router = express.Router();
const { homePage, handleLogin, registerUser, handleImageUpload, handleImageFetch, handleSpecificUserImageFetch } = require('../controller/user')
const fileUpload = require('express-fileupload');

// Enable file upload middleware
router.use(fileUpload());

/* GET server home page. */
router.get('/', homePage);

/*
  - Route for user registration
  - Receives the post request from client
  - Creates a new user with the given username and password
  - Bcrypt is used to hash passwords
 */
router.post('/register', registerUser);

/*
  - Route for user login
  - Extracts the username and password from the request body
  - If the user is found in the db 
  - Uses the bcrypt's compare function to compare passwords
  - Checks if the user is admin and if he is then sends the list of users with their username and user types
  - If the user is a normal user then just sends his username and 
 */
router.post("/login", handleLogin);

/*
  - Route for image upload
  - Uses File Upload package to handle file upload
  - Extracts the username and file caption from request body and image file from the files object added to the request body
  - Creates unique filename using the uuid package
  - Uses the MV method to move uploaded files to the correct location
  - Creates the Url for the image and then creates a record for it in the posts db
 */
router.post('/upload', handleImageUpload);

/*
  - Route for fetching images
  - Fetches images from the posts db and maps them to the image object
  - Returns the image object as a response
 */
router.get('/images', handleImageFetch);

router.get('/images/:username', handleSpecificUserImageFetch);

// Wildcard route for wrong paths
router.get("*", (req, res) => {
  res.render('404');
});

module.exports = router;