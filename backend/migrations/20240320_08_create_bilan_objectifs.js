'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BilanObjectifs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      bilan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bilans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      objectif_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Objectifs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Ajout d'un index unique pour éviter les doublons
    await queryInterface.addIndex('BilanObjectifs', ['bilan_id', 'objectif_id'], {
      unique: true,
      name: 'bilan_objectif_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BilanObjectifs');
  }
}; 