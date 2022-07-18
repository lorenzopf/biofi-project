'use strict';
let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    pseudo: String,
    email: String,
    role: {
        type: String,
        default: "Visitor"
    },
    avatar_url: String,
    hash: String,
    salt: String,
    create_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);