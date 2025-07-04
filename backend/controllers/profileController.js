const { User, Profile } = require('../models');

// Récupérer le profil de l'utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await Profile.findOne({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'civility', 'firstName', 'lastName']
      }]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

// Récupérer le profil d'un utilisateur par son ID
exports.getProfileById = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const profile = await Profile.findOne({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'civility', 'firstName', 'lastName']
      }]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

// Créer ou mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    // Mettre à jour les informations de l'utilisateur si elles sont présentes
    if (profileData.user) {
      const userData = profileData.user;
      await User.update(
        {
          civility: userData.civility,
          firstName: userData.firstName,
          lastName: userData.lastName
        },
        { where: { id: userId } }
      );
      // Supprimer les données utilisateur du profileData pour éviter les doublons
      delete profileData.user;
    }

    // Vérifier si un profil existe déjà pour cet utilisateur
    let profile = await Profile.findOne({ where: { userId } });

    if (profile) {
      // Mettre à jour le profil existant
      await profile.update(profileData);
    } else {
      // Créer un nouveau profil
      profile = await Profile.create({
        ...profileData,
        userId
      });
    }

    res.json({
      message: profile ? 'Profil mis à jour avec succès' : 'Profil créé avec succès',
      profile
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

// Supprimer le profil de l'utilisateur
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await Profile.findOne({ where: { userId } });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    
    await profile.destroy();
    
    res.json({ message: 'Profil supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du profil' });
  }
}; 