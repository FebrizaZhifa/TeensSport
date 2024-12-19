const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Endpoint untuk registrasi user
router.post('/register', registerUser);

// Endpoint untuk login user
router.post('/login', loginUser);

module.exports = router;
