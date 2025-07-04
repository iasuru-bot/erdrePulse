const { User } = require('../models');

exports.isCoachOrAdmin = async (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est un coach ou un admin
    if (!req.user.coach && !req.user.admin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Si un userId est fourni dans les paramètres, vérifier que l'utilisateur cible n'est pas un coach ou un admin
    if (req.params.userId) {
      const targetUser = await User.findByPk(req.params.userId);
      if (!targetUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      if (targetUser.coach || targetUser.admin) {
        return res.status(403).json({ message: 'Accès non autorisé à ce profil' });
      }
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification des rôles:', error);
    res.status(500).json({ message: 'Erreur lors de la vérification des rôles' });
  }
}; 