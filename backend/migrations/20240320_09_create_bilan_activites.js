'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BilanActivites', {
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
      activite_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Activites',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      frequence: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estOptionnelle: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.addIndex('BilanActivites', ['bilan_id', 'activite_id'], {
      unique: true,
      name: 'bilan_activite_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BilanActivites');
  }
}; 