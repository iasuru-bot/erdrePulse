'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BilanTestsPhysiques', {
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
      test_effort_6_mois: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      test_effort_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_equilibre_1: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      test_equilibre_2: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      test_equilibre_resultat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      test_equilibre_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_equilibre_conseil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_souplesse_resultat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      test_souplesse_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_souplesse_conseil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_force_inf_resultat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      test_force_inf_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_force_inf_conseil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_force_sup_resultat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      test_force_sup_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_force_sup_conseil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_endurance_resultat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      test_endurance_lbn: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      test_endurance_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_endurance_conseil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_vma_resultat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      test_vma_vo2max: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      test_vma_commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_vma_conseil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fatigue_equilibre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatigue_souplesse: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatigue_force_inf: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatigue_force_sup: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatigue_endurance: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatigue_vma: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fatigue_commentaire: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('BilanTestsPhysiques');
  }
}; 