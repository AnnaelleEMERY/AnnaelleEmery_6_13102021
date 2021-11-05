const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const likesCtrl = require('../controllers/likes');
const multer = require('../middleware/multer-config');


router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Add and remove sauces review
router.post('/:id/like',auth, likesCtrl.addLikeOrDislike);

module.exports = router;