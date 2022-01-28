const express = require('express');

const router = express.Router();

const {registerController} = require('../controllers/authController');


//registern user api
router.post('/register', registerController);

module.exports = router;