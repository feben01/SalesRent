const express = require('express');
const { register, verifyOtp } = require('../controllers/poController');
const upload = require('../utilities/upload');
const router = express.Router();

router.post('/register', upload.single('id_picture'), register);
router.post('/verify-otp', verifyOtp);

module.exports = router;