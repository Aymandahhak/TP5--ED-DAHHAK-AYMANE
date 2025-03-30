const express = require('express');
const router = express.Router();
const { ajouterLivraison, updateStatutLivraison } = require('../controllers/livraisonController');

router.post('/ajouter', ajouterLivraison);
router.put('/:id', updateStatutLivraison);

module.exports = router;
