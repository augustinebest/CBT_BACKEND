const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String, 
        unique: true,
        require: true,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    number: {
        type: Number
    },
    password: {
        type: String,
        require: true,
    },
    admin: {
        type: Number,
        default: 0
    },
    profile_img: {
        type: String,
        default: '1.jpg'
    }
})

module.exports = mongoose.model('User', UserSchema);