const jwt = require('jsonwebtoken')
//STAFF LOGIN CONTROLLER
const staffs = require('../models/staffModel')

exports.staffLoginController = async (req, res) => {
    console.log('Inside staff login controller');

    //logic
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await staffs.findOne({username,email,password }) //email : email

        if (existingUser) {
            //token generate
            const token = jwt.sign({staffId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                staffs:existingUser,
                token
            })
        }
        else {
            res.status(404).json(`invalid username ,email or password`)
        }

    } catch (error) {
        res.status(401).json(error)
    }
  }
