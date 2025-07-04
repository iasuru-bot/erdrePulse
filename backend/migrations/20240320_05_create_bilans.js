'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bilans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.ENUM('draft', 'validated'),
        defaultValue: 'draft'
      },
      taille: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      poids: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      imc: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      interpretation_imc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      niveau_activite_physique: {
        type: Sequelize.STRING,
        allowNull: false
      },
      metabolisme_basal: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      metabolisme_total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      nap: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      commentaire_metabolisme: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      commentaire_global: {
        type: Sequelize.TEXT,
        allowNull: true
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
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bilans');
  }
}; 