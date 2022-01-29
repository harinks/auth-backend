const express = require('express');

const router = express.Router();

const {registerController,loginController} = require('../controllers/authController');


//registern user api
router.post('/register', registerController);

//login user api
router.post('/login', loginController)

module.exports = router;