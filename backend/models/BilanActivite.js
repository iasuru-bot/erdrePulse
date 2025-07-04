const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BilanActivite = sequelize.define('BilanActivites', {
    bilan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bilans',
        key: 'id'
      }
    },
    activite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Activites',
        key: 'id'
      }
    },
    frequence: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estOptionnelle: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  BilanActivite.associate = (models) => {
    BilanActivite.belongsTo(models.Bilan, {
      foreignKey: 'bilan_id',
      as: 'bilan'
    });

    BilanActivite.belongsTo(models.Activite, {
      foreignKey: 'activite_id',
      as: 'activite'
    });
  };

  return BilanActivite;
}; 