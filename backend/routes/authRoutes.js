const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const registerUser = require("../controllers/auth/registerController");
const loginUser = require('../controllers/auth/loginController');
const deleteUser = require('../controllers/auth/deleteAccountController');
const getUsers = require('../controllers/auth/getUsersController');
const getMeProfile = require('../controllers/auth/getMeProfile');

// REGISTER (Qeydiyyat)
router.post('/register', registerUser);

// LOGIN (Giriş)
router.post('/login', loginUser);

// DELETE ACCOUNT (Hesabı silmək)
router.delete('/delete-account', verifyToken, deleteUser);

// BÜTÜN İSTİFADƏÇİLƏRİN SİYAHISI (Test məqsədilə)
router.get('/users', getUsers);

// Oz profilimizi qaytarırıq (Test məqsədilə)
router.get('/me', verifyToken, getMeProfile);

module.exports = router;