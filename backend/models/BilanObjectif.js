const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BilanObjectif = sequelize.define('BilanObjectif', {
    bilan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bilans',
        key: 'id'
      }
    },
    objectif_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Objectifs',
        key: 'id'
      }
    }
  });

  BilanObjectif.associate = (models) => {
    BilanObjectif.belongsTo(models.Bilan, {
      foreignKey: 'bilan_id',
      as: 'bilan'
    });

    BilanObjectif.belongsTo(models.Objectif, {
      foreignKey: 'objectif_id',
      as: 'objectif'
    });
  };

  return BilanObjectif;
}; 