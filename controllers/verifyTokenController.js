const jwt = require('jsonwebtoken');
const User = require('../models/User');


//verify token controller for reset
const verifyTokenController = async(req,res) => {
    const {token} = req.query;

    if(!token){
        return res.status(404).json({success: false, msg: "Invaild Token !"})
    }

    //decode the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.secret)
    } catch (err) {
        return res.status(404).json({success: false, msg: "Invaild Token !", error: err})
    }

    //checking if user is present or not
    const oldUser = await User.findOne({email: decodedToken.email});
    if(!oldUser){
        return res.status(404).json({success: false, msg: "User not found !"})
    }
    return res.status(200).json({success: true, data: decodedToken.email});
}

module.exports = verifyTokenController;