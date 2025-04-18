const staffs = require('../models/staffModel')
//login function
const jwt = require('jsonwebtoken');

exports.adminLoginController = (req, res) => {
    console.log("inside adminlogin");

    const { username, password } = req.body;
    const ADMIN_USERNAME = "meenu";
    const ADMIN_PASSWORD = "meenu123";

    // Check if the credentials are correct
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
            { username: ADMIN_USERNAME }, // Payload (you can add more details if necessary)
            process.env.JWTPASSWORD // Secret key (change this to a secure key)
            // No expiration set, so this token will not expire
        );

        // Respond with the token
        res.status(200).json({ message: "Admin login successful", token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

//staff register
exports.staffRegisterController = async (req, res) => {
    console.log('Inside a register controller');

    //logic
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await staffs.findOne({ email }) //email : email

        if (existingUser) {
            res.status(406).json(`User already exist , Please login...!!!!`)
        }
        else {
            const newStaff = new staffs({
                username, //username : username
                email, //email : email,
                password, //   password :password,
                profile: ""
            })
            await newStaff.save()
            res.status(200).json(newStaff)
        }

    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllStaffController = async (req, res) => {
    console.log(`inside getAll staff controller`);

    try {
        const allStaff = await staffs.find()
        res.status(200).json(allStaff)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.editStaffController = async (req, res) => {
    console.log('inside edit staff controller');
    const { id } = req.params

    const {username, email, password } = req.body
    // const username = req.username
    console.log(username, email, password);
    try {
        const updateStaff = await staffs.findByIdAndUpdate({ _id:id }, { username, email, password }, { new: true })
        await updateStaff.save()
        res.status(200).json(updateStaff)
    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.removeStaffController = async (req, res) => {
    console.log(`inside remove staff controller`);
    const {id} = req.params

    try {
        const removeStaff = await staffs.findByIdAndDelete({_id:id})
        res.status(200).json(removeStaff)
    } catch (error) {
        res.status(401).json(error)
    }
}