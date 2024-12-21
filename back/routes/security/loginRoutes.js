const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');

// Route pour la connexion
router.get('/', loginController.login);

module.exports = router;
