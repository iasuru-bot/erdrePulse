'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BilanSanteVies', {
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
      antecedents_medicaux: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      antecedents_medicaux_precisions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      operations_accidents: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      operations_accidents_precisions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      traitements_actuels: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      traitements_actuels_precisions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      douleurs_thoraciques: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      douleurs_thoraciques_precisions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      douleurs_chroniques: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      douleurs_chroniques_precisions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fumeur: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      consommation_alcool: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      heures_alcool_semaine: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nb_heures_sommeil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NbHeuresSommeilRefs',
          key: 'id'
        }
      },
      nb_repas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NbRepasRefs',
          key: 'id'
        }
      },
      petit_dejeuner: {
        type: Sequelize.STRING,
        allowNull: true
      },
      collation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      collation_details: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('BilanSanteVies');
  }
}; 