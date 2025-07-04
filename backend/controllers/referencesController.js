const { NbHeuresSommeilRef, NbRepasRef } = require('../models');

// Récupérer toutes les références pour les heures de sommeil
exports.getHeuresSommeilRefs = async (req, res) => {
  try {
    const refs = await NbHeuresSommeilRef.findAll({
      order: [['id', 'ASC']]
    });
    res.json(refs);
  } catch (error) {
    console.error('Erreur lors de la récupération des références heures de sommeil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des références', error: error.message });
  }
};

// Récupérer toutes les références pour le nombre de repas
exports.getNbRepasRefs = async (req, res) => {
  try {
    const refs = await NbRepasRef.findAll({
      order: [['id', 'ASC']]
    });
    res.json(refs);
  } catch (error) {
    console.error('Erreur lors de la récupération des références nombre de repas:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des références', error: error.message });
  }
}; 