const express = require('express')
const app = express()
const routes = require('./Routes/routes')
const connectDB = require('./db')
const protectedRoutes = require('./Routes/protectedRoutes')
require('dotenv').config()

const PORT = process.env.PORT
const passport = require('passport');
const User = require('./Model/user');

connectDB();

app.use(require('express-session')({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', routes); // Non-protected routes
app.use('/', protectedRoutes); // Protected routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})