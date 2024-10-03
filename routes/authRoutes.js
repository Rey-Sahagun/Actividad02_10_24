const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/createUser', authController.createUser); // Nueva ruta para crear usuarios

module.exports = router;
