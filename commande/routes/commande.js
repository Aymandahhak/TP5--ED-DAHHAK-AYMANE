const express = require('express');
const router = express.Router();
const { ajouterCommande, getCommande, updateStatut } = require('../controllers/commandeController');

router.post('/ajouter', ajouterCommande);
router.get('/:id', getCommande);
router.patch('/:id/statut', updateStatut);

module.exports = router;
