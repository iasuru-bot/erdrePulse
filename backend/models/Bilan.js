const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Bilan = sequelize.define("Bilan", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM("draft", "validated"),
      defaultValue: "draft"
    },
    taille: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 100,
        max: 250
      }
    },
    poids: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 30,
        max: 300
      }
    },
    imc: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 10,
        max: 50
      }
    },
    niveau_activite_physique: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    metabolisme_basal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    metabolisme_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    interpretation_imc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nap: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1.0,
        max: 5.0
      }
    },
    commentaire_metabolisme: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commentaire_global: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    hooks: {
      beforeValidate: (bilan) => {
        // Calcul automatique de l'IMC
        if (bilan.taille && bilan.poids) {
          const tailleEnMetres = bilan.taille / 100;
          bilan.imc = bilan.poids / (tailleEnMetres * tailleEnMetres);
        }
      }
    }
  });

  Bilan.associate = (models) => {
    // Relation avec le coach
    Bilan.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'coach'
    });

    // Relation avec le client
    Bilan.belongsTo(models.User, {
      foreignKey: 'clientId',
      as: 'client'
    });

    // Relation avec les objectifs
    Bilan.belongsToMany(models.Objectif, {
      through: 'BilanObjectifs',
      foreignKey: 'bilan_id',
      as: 'objectifs'
    });

    // Relation avec les activités
    Bilan.belongsToMany(models.Activite, {
      through: 'BilanActivites',
      foreignKey: 'bilan_id',
      as: 'activites'
    });

    // Relation avec BilanSanteVie
    Bilan.hasOne(models.BilanSanteVie, {
      foreignKey: 'bilan_id',
      as: 'santeVie'
    });

    // Relation avec BilanTestsPhysiques
    Bilan.hasOne(models.BilanTestsPhysiques, {
      foreignKey: 'bilan_id',
      as: 'testsPhysiques'
    });
  };

  return Bilan;
}; 