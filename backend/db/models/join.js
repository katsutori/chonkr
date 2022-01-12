'use strict';
module.exports = (sequelize, DataTypes) => {
  const Join = sequelize.define('Join', {
    albumId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Albums' }
    },
    photoId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Photos'}
    }
  }, {});
  Join.associate = function(models) {
    // associations can be defined here
    Join.belongsTo(models.Album, { foreignKey: 'albumId' })
    Join.belongsTo(models.Photo, { foreignKey: 'photoId'})
  };
  return Join;
};
