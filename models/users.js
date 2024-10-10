const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    username: {
        type: String,
        set: function(value) {
            return value.startsWith('@') ? value : `@${value}`;
        }
    },
    password: { type: String, required: true },
    token: { type: String, required: true }
})

const User = mongoose.model('users', UserSchema);

module.exports =  User;