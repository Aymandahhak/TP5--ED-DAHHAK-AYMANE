const Commande = require('../models/commande');
const axios = require('axios');

exports.ajouterCommande = async (req, res) => {
  try {
    const { produits, client_id } = req.body;
    let prixTotal = 0;

    // Vérifier les produits via l'API produit
    for (const item of produits) {
      const produitResponse = await axios.get(`http://localhost:3001/produit/${item.produit_id}`);
      const produit = produitResponse.data;
      
      if (!produit || produit.stock < item.quantite) {
        return res.status(400).json({ message: `Le produit ${item.produit_id} est indisponible` });
      }
      prixTotal += produit.prix * item.quantite;

      // Mettre à jour le stock via l'API produit
      await axios.patch(`http://localhost:3001/produit/${item.produit_id}/stock`, {
        stock: produit.stock - item.quantite
      });
    }

    const commande = new Commande({ produits, client_id, prix_total: prixTotal });
    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une commande spécifique
exports.getCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    res.json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour le statut d'une commande
exports.updateStatut = async (req, res) => {
  try {
    const { statut } = req.body;
    const commande = await Commande.findByIdAndUpdate(req.params.id, { statut }, { new: true });
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    res.json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
