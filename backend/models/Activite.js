const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Activite = sequelize.define("Activite", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Activite.associate = (models) => {
    Activite.belongsToMany(models.Bilan, {
      through: 'BilanActivites',
      foreignKey: 'activite_id',
      as: 'bilans'
    });
  };

  return Activite;
}; 