const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const BilanTestsPhysiques = sequelize.define("BilanTestsPhysiques", {
    bilan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bilans',
        key: 'id'
      }
    },
    test_effort_6_mois: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    test_effort_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_equilibre_1: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    test_equilibre_2: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    test_equilibre_resultat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    test_equilibre_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_equilibre_conseil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_souplesse_resultat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    test_souplesse_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_souplesse_conseil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_force_inf_resultat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    test_force_inf_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_force_inf_conseil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_force_sup_resultat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    test_force_sup_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_force_sup_conseil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_endurance_resultat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    test_endurance_lbn: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    test_endurance_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_endurance_conseil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_vma_resultat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    test_vma_vo2max: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    test_vma_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    test_vma_conseil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fatigue_equilibre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatigue_souplesse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatigue_force_inf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatigue_force_sup: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatigue_endurance: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatigue_vma: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fatigue_commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  BilanTestsPhysiques.associate = (models) => {
    BilanTestsPhysiques.belongsTo(models.Bilan, {
      foreignKey: 'bilan_id',
      as: 'bilan'
    });
  };

  return BilanTestsPhysiques;
}; 