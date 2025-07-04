'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date_naissance: {
        type: Sequelize.DATEONLY
      },
      taille_cm: {
        type: Sequelize.FLOAT
      },
      poids_kg: {
        type: Sequelize.FLOAT
      },
      imc: {
        type: Sequelize.FLOAT
      },
      adresse: {
        type: Sequelize.STRING
      },
      complement_adresse: {
        type: Sequelize.STRING
      },
      code_postal: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.STRING
      },
      activite_professionnelle: {
        type: Sequelize.STRING
      },
      secteur_activite: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profiles');
  }
}; 