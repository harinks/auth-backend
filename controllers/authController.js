const bcrypt = require('bcryptjs');
const secret = 'QFK4PLDZ10AN6';
const User = require('../models/User');

const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, msg: "please fill in all fields!" })
    }

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({ success: false, msg: "please enter valid email!" })
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, msg: "Password should be atleast of length 8!" })
    }
    //check if user email is already preset
    const oldUser = await User.findOne({ email })
    if (oldUser) {
        return res.status(403).json({ success: false, msg: "this email is already registered!" })
    }

    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            const hashPassword = hash;
            const newUser = new User({
                name,
                email,
                password: hashPassword,
            })

            newUser.save();
            res.status(201).json({ success: true, msg: "Registered success" });
        })
    })

}

module.exports = { registerController }