'use strict';
const bcrypt = require('bcryptjs');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Azerty1.', salt);

    const users = [
      {
        civility: 'Monsieur',
        firstName: 'Admin',
        lastName: 'Coach',
        email: 'admin@coach.com',
        password: hashedPassword,
        isVerified: true,
        coach: true,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        civility: 'Monsieur',
        firstName: 'Coach',
        lastName: 'Simple',
        email: 'coach@coach.com',
        password: hashedPassword,
        isVerified: true,
        coach: true,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        civility: 'Madame',
        firstName: 'User',
        lastName: 'Lambda',
        email: 'user@user.com',
        password: hashedPassword,
        isVerified: true,
        coach: false,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});

    // Récupérer les IDs des utilisateurs insérés
    const insertedUsers = await queryInterface.sequelize.query(
      `SELECT id, email FROM Users WHERE email IN ('admin@coach.com', 'coach@coach.com', 'user@user.com');`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Créer les profils pour chaque utilisateur
    const profiles = insertedUsers.map(user => ({
      userId: user.id,
      date_naissance: '1990-01-01',
      taille_cm: 175,
      poids_kg: 70,
      imc: 22.86,
      adresse: '123 rue Example',
      complement_adresse: '',
      code_postal: '75000',
      ville: 'Paris',
      activite_professionnelle: 'coach_sportif',
      secteur_activite: 'sport',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Profiles', profiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer d'abord les profils
    await queryInterface.bulkDelete('Profiles', null, {});
    // Puis supprimer les utilisateurs
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 