const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const BilanSanteVie = sequelize.define("BilanSanteVie", {
    bilan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bilans',
        key: 'id'
      }
    },
    antecedents_medicaux: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    antecedents_medicaux_precisions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    operations_accidents: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    operations_accidents_precisions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    traitements_actuels: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    traitements_actuels_precisions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    douleurs_thoraciques: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    douleurs_thoraciques_precisions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    douleurs_chroniques: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    douleurs_chroniques_precisions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fumeur: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    consommation_alcool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    alcool_indicateur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    heures_alcool_semaine: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 168
      }
    },
    nb_heures_sommeil_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NbHeuresSommeilRefs',
        key: 'id'
      }
    },
    nb_repas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NbRepasRefs',
        key: 'id'
      }
    },
    petit_dejeuner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    collation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    collation_details: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  BilanSanteVie.associate = (models) => {
    BilanSanteVie.belongsTo(models.Bilan, {
      foreignKey: 'bilan_id',
      as: 'bilan'
    });
    BilanSanteVie.belongsTo(models.NbHeuresSommeilRef, {
      foreignKey: 'nb_heures_sommeil_id',
      as: 'nbHeuresSommeilRef'
    });
    BilanSanteVie.belongsTo(models.NbRepasRef, {
      foreignKey: 'nb_repas_id',
      as: 'nbRepasRef'
    });
  };

  return BilanSanteVie;
}; 