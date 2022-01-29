const express = require('express');

const router = express.Router();

const {registerController,loginController,fogetPassController} = require('../controllers/authController');


//registern user api
router.post('/register', registerController);

//login user api
router.post('/login', loginController)

//forget password api
router.post('/forgetpassword', fogetPassController);

module.exports = router;