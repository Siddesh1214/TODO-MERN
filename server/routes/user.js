const express = require('express');
const { signup, login, getMyProfile, logout } = require('../controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/myProfile', isAuthenticated, getMyProfile);
router.get('/logout', logout);

module.exports = router;