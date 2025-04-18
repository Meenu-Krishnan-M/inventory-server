const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    }
})
const admins = mongoose.model("admins",adminSchema)
module.exports = admins