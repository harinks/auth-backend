const express = require('express');

const router = express.Router();

const { registerController, loginController, fogetPassController, resetPasswordController } = require('../controllers/authController');
const verifyTokenController = require('../controllers/verifyTokenController')

//register user api
router.post('/register', registerController);

//login user api
router.post('/login', loginController)

//forget password api
router.post('/forgetpassword', fogetPassController);

//verify token api
router.get('/verifyToken', verifyTokenController);

//reset password api
router.post('/resetpassword', resetPasswordController)

module.exports = router;