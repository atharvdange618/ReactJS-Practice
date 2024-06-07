const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    profilePic: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Plugin passportLocalMongoose into the schema
userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;