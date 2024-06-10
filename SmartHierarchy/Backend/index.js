const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const routes = require('./Routes/routes')
const connectDB = require('./db')
const fileUpload = require('express-fileupload');
const protectedRoutes = require('./Routes/protectedRoutes')
require('dotenv').config()

app.use(express.static('public'));

app.use(cookieParser());

const PORT = process.env.PORT

// Middleware for parsing multipart/form-data (file uploads)
app.use(fileUpload());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", 'ejs')

// // Use CORS middleware with custom options
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

connectDB();

app.use(require('express-session')({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes); // Non-protected routes
app.use('/auth', protectedRoutes); // Protected routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})