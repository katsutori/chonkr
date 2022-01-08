'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING(1000),
      validate: {
        len: [10, 1000]
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      default: ''
    },
    dateTaken: {
      allowNull: false,
      type: DataTypes.DATE,
    }

  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
    Photo.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Photo;
};
