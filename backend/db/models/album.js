'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: {
      allowNull: false,
      type:DataTypes.STRING(50),
      validate: {
        len: [1, 50]
      }
    }
      ,
    userId: {
      allowNull: false,
      type:DataTypes.INTEGER,
      references: { model: 'Users' }
    }
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, {foreignKey: 'userId'})
    Album.hasMany(models.Join, { foreignKey: 'albumId', onDelete: 'CASCADE', hooks: true})
  };
  return Album;
};
