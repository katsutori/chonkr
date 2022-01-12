'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(50),
      validate: {
        len: [1, 50]
      }
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
    Photo.hasMany(models.Join, { foreignKey: 'photoId', onDelete: 'CASCADE', hooks: true })
  };
  return Photo;
};
