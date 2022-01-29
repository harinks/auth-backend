const express = require('express');
const router = express.Router();

const {verifyEmailController} = require('../controllers/verifyEmailController')

router.get('/verify', verifyEmailController)

module.exports = router