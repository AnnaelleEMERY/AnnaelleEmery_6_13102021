const express = require('express');
const bouncer = require ("express-bouncer") (500, 600000, 3); // pour les attaques ddos : bloqué min 500 ms et max 10min pour 3requetes
const router = express.Router();

const userCtrl = require('../controllers/user');

const verifyPassword = require('../middleware/verifyPassword');

router.post('/signup', bouncer.block, verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;