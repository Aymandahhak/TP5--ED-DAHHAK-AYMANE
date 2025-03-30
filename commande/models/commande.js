const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  produits: [{
    produit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit',
      required: true
    },
    quantite: {
      type: Number,
      required: true
    }
  }],
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  prix_total: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum: ['En attente', 'Confirmée', 'Expédiée'],
    default: 'En attente'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Commande', commandeSchema);