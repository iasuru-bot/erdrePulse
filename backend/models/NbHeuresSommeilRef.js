const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const NbHeuresSommeilRef = sequelize.define("NbHeuresSommeilRef", {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true
  });

  NbHeuresSommeilRef.associate = (models) => {
    NbHeuresSommeilRef.hasMany(models.BilanSanteVie, {
      foreignKey: 'nb_heures_sommeil_id',
      as: 'bilansSanteVie'
    });
  };

  return NbHeuresSommeilRef;
}; 