const express = require('express');
const router = express.Router();
const { ajouterProduit, getProduit, updateStock } = require('../controllers/produitController');

router.post('/ajouter', ajouterProduit);
router.get('/:id', getProduit);
router.patch('/:id/stock', updateStock);

module.exports = router;
