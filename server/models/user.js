const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/reactpractice");

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

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model('User', userSchema);