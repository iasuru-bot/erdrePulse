'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Profile = sequelize.define('Profile', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    date_naissance: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    taille_cm: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    poids_kg: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    imc: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    complement_adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code_postal: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activite_professionnelle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secteur_activite: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Profile.associate = function(models) {
    // Définition de la relation avec le modèle User
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Profile;
}; 
