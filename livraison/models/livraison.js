const mongoose = require('mongoose');

const livraisonSchema = new mongoose.Schema({
  commande_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande',
    required: true
  },
  transporteur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  statut: {
    type: String,
    enum: ['En attente', 'En cours', 'Livrée'],
    default: 'En attente'
  },
  adresse_livraison: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Livraison', livraisonSchema);