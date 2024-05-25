const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb+srv://atharvdangedev:<password>@cluster0.bxjpvk9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    dbName: "RESTAURANT_APPLICATION"
}).then(() => {
    console.log("Connected to the database")
}).catch((err) => {
    console.error(err.message)
});


//model for storing users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});


module.exports = mongoose.model('User', userSchema);