const bcrypt = require('bcryptjs');
const User = require('../models/User');

const tokenGen = require('../config/createToken');

const emailSender = require('../config/sendEmail');

const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, msg: "please fill in all fields !" })
    }

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({ success: false, msg: "please enter valid email !" })
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, msg: "Password should be atleast of length 8 !" })
    }

    //check if user email is already preset
    const oldUser = await User.findOne({ email })
    if (oldUser) {
        return res.status(403).json({ success: false, msg: "this email is already registered !" })
    }

    //encrypt password
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const hashPassword = hash;
            const newUser = new User({
                name,
                email,
                password: hashPassword,
            })

            await newUser.save();

            //generate token
            const token = tokenGen({ email: newUser.email })

            //send mail verfication
            const link = "http://" + req.hostname + ":3001/api/email/verify?token=" + token;

            const sendMail = await emailSender(newUser.email, link)
            if (sendMail) {
                res.status(201).json({ success: true, msg: "Registered success, but email is not verified" });
            } else {
                res.status(201).json({ success: true, msg: "Registered success" });
            }
        })
    })

}

const loginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: "Invaild Email/Password !" })
    }

    //finding old user
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
        return res.status(400).json({ success: false, msg: "Invaild Email/Password !" })
    }

    //compare password
    const comparePassword = await bcrypt.compare(password, oldUser.password);
    if (!comparePassword) {
        return res.status(400).json({ success: false, msg: "Invaild Email/Password !" })
    }

    //generate token with user info
    const token = tokenGen({ email: oldUser.email, _id: oldUser._id })
 
    //sending response
    res.status(200).json({ success: true, token, msg: "login successfully" })
}

module.exports = { registerController, loginController }