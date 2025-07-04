const { User } = require('../models');
const { Op } = require('sequelize');

// Récupérer tous les utilisateurs (sauf admins)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        admin: false, // Ne pas inclure les admins
        id: { [Op.ne]: req.user.id }, // Ne pas inclure l'utilisateur connecté
        isVerified: true
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'coach', 'isVerified'],
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Rechercher des utilisateurs
exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Le terme de recherche est requis' });
    }

    const users = await User.findAll({
      where: {
        admin: false, // Ne pas inclure les admins
        id: { [Op.ne]: req.user.id }, // Ne pas inclure l'utilisateur connecté
        isVerified: true,
        [Op.or]: [
          { firstName: { [Op.like]: `%${q}%` } },
          { lastName: { [Op.like]: `%${q}%` } },
          { email: { [Op.like]: `%${q}%` } }
        ]
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'coach', 'isVerified'],
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });

    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la recherche des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche des utilisateurs' });
  }
};

// Récupérer un utilisateur spécifique
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'coach']
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.admin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

// Mettre à jour le rôle d'un utilisateur (admin uniquement)
exports.updateUserRole = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (!req.user.admin) {
      return res.status(403).json({ message: 'Accès non autorisé. Rôle admin requis.' });
    }

    const { role, value } = req.body;
    if (!role || typeof value !== 'boolean') {
      return res.status(400).json({ message: 'Données invalides' });
    }

    if (role !== 'coach' && role !== 'admin') {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Empêcher la modification d'un admin par un autre admin
    if (user.admin && req.user.id !== user.id) {
      return res.status(403).json({ message: 'Impossible de modifier un autre administrateur' });
    }

    // Mettre à jour le rôle
    await user.update({ [role]: value });

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      coach: user.coach
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle' });
  }
};

// Retirer le rôle d'un utilisateur (admin uniquement)
exports.removeUserRole = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (!req.user.admin) {
      return res.status(403).json({ message: 'Accès non autorisé. Rôle admin requis.' });
    }

    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: 'Données invalides' });
    }

    if (role !== 'coach' && role !== 'admin') {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Empêcher la modification d'un admin par un autre admin
    if (user.admin && req.user.id !== user.id) {
      return res.status(403).json({ message: 'Impossible de modifier un autre administrateur' });
    }

    // Retirer le rôle
    await user.update({ [role]: false });

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      coach: user.coach
    });
  } catch (error) {
    console.error('Erreur lors du retrait du rôle:', error);
    res.status(500).json({ message: 'Erreur lors du retrait du rôle' });
  }
}; 