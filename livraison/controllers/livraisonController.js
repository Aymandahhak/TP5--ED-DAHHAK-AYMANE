const Livraison = require('../models/livraison');
const Commande = require('../models/commande');

// Ajouter une livraison
exports.ajouterLivraison = async (req, res) => {
  try {
    const { commande_id, transporteur_id, adresse_livraison } = req.body;

    // Vérifier si la commande existe
    const commande = await Commande.findById(commande_id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    const livraison = new Livraison({ commande_id, transporteur_id, adresse_livraison });
    await livraison.save();
    res.status(201).json(livraison);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour le statut d'une livraison
exports.updateStatutLivraison = async (req, res) => {
  try {
    const { statut } = req.body;
    const livraison = await Livraison.findByIdAndUpdate(req.params.id, { statut }, { new: true });
    if (!livraison) return res.status(404).json({ message: "Livraison non trouvée" });
    res.json(livraison);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
