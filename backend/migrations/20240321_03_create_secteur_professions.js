'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Créer la table de liaison SecteurProfessions
    await queryInterface.createTable('SecteurProfessions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      secteur_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Secteurs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      profession_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Professions',
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

    
    // 3. Supprimer les anciennes tables
    await queryInterface.dropTable('Options');
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Recréer la table Options
    await queryInterface.createTable('Options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
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

    // 2. Recréer l'index unique
    await queryInterface.addIndex('Options', ['category', 'value'], {
      unique: true,
      name: 'options_category_value_unique'
    });


    // 5. Supprimer la table de liaison
    await queryInterface.dropTable('SecteurProfessions');
  }
}; 