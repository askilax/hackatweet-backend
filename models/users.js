const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    userName: {
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