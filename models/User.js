const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    secret: {
        type: String,
        minlength: 4,
        trim: true
    }
});

const User = mongoose.model("User", userSchema);


module.exports = {
    User
}