const express = require('express');
const router = express.Router();
const { register, login, getProfil, verifyToken } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profil', auth, getProfil);
router.get('/verify', auth, verifyToken);

module.exports = router;