const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Secteur = sequelize.define('Secteur', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: true
  });

  Secteur.associate = (models) => {
    // Relation many-to-many avec les professions
    Secteur.belongsToMany(models.Profession, {
      through: 'SecteurProfessions',
      foreignKey: 'secteur_id',
      otherKey: 'profession_id',
      as: 'professions'
    });
  };

  return Secteur;
}; 