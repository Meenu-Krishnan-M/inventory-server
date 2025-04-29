const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

//create model
const staffs=mongoose.model("staffs",staffSchema)

//export model
module.exports = staffs