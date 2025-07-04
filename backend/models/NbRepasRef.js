const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const NbRepasRef = sequelize.define("NbRepasRef", {
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

  NbRepasRef.associate = (models) => {
    NbRepasRef.hasMany(models.BilanSanteVie, {
      foreignKey: 'nb_repas_id',
      as: 'bilansSanteVie'
    });
  };

  return NbRepasRef;
}; 