const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Name: {type: String,required: [true, "Please Enter Your Name"]},
    Username: {type: String,required: [true, "Please Enter Your Username"],unique:[true,"Username is already taken"]},
    Email: {type: String,required: [true, "Please Add Your e-mail address"]},
    Points: {type: Number,required: [true, "Please Add User Points for Leaderboard"]},
})

const UserModel = mongoose.model("userdatas", userSchema)

module.exports = UserModel