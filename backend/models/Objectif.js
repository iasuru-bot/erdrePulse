const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Objectif = sequelize.define("Objectif", {
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Objectif.associate = (models) => {
    Objectif.belongsToMany(models.Bilan, {
      through: 'BilanObjectifs',
      foreignKey: 'objectif_id',
      as: 'bilans'
    });
  };

  return Objectif;
}; 