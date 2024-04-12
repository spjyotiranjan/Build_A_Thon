const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Name: {type: String,required: [true, "Please Enter Your Name"]},
    Username: {type: String,required: [true, "Please Enter Your Username"]},
    Email: {type: String,required: [true, "Please Add Your e-mail address"]},
    Rank: {type: Number,required: [true, "Please Add User Rank in Leaderboard"]},
})

const UserModel = mongoose.model("userdatas", userSchema)

module.exports = UserModel