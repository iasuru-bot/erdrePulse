'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Création de la table NbHeuresSommeilRef
    await queryInterface.createTable('NbHeuresSommeilRefs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false
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

    // Création de la table NbRepasRef
    await queryInterface.createTable('NbRepasRefs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('NbHeuresSommeilRefs');
    await queryInterface.dropTable('NbRepasRefs');
  }
}; 