const mongoose = require("mongoose");

mongoose.connect("mongourl")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 25
    },
    password:  {
        type: String,
        required: true,
        minLength: 4,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    lastname: {
        type: String,
        trim: true,
        maxLength: 20
    }

})
const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const Accounts = mongoose.model('Accounts',accountSchema);

module.exports = {
    User,
    Accounts
}