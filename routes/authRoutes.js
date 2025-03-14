const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');  // Certifique-se de que o caminho está correto

// Rota para registro de usuário
router.post('/register', authController.register);

// Rota para login de usuário
router.post('/login', authController.login);

// Rota para logout de usuário
router.get('/logout', authController.logout);

module.exports = router;