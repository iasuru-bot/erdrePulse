const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Option = sequelize.define('Option', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
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
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['category', 'value']
      }
    ]
  });

  Option.associate = (models) => {
    // Relation many-to-many entre secteurs et professions
    Option.belongsToMany(Option, {
      through: 'SecteurProfessions',
      as: 'professions',
      foreignKey: 'secteur_id',
      otherKey: 'profession_id'
    });

    Option.belongsToMany(Option, {
      through: 'SecteurProfessions',
      as: 'secteurs',
      foreignKey: 'profession_id',
      otherKey: 'secteur_id'
    });
  };

  return Option;
}; 