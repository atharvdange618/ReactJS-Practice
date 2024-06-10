const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    address: {
        type: String
    },
    usertype: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        default: "no image provided"
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    usersAdded: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        validate: {
            validator: function (value) {
                // Check if the number of users added is less than or equal to 3
                return value.length <= 3;
            },
            message: 'You can only add up to 3 users.'
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
