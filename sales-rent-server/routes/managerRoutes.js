const express = require('express');
const router = express.Router();

const SignUp = require('../controllers/managerController');

// Sign Up

router.post('/signup', SignUp);

router.get('/test', (req, res) => {
    res.send('Hello from the rental API Routes!');
});

module.exports = router;