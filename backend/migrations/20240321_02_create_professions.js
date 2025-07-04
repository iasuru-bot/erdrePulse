'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Créer la table Professions
    await queryInterface.createTable('Professions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    // Supprimer la table Professions
    await queryInterface.dropTable('Professions');
  }
}; 