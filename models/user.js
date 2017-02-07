'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
     },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true
    },
    password: DataTypes.STRING,
    picture: DataTypes.BLOB
  }, {
    classMethods: {
      associate: function(models) {
          User.belongsToMany(models.Project, { as: 'Projects', through: models.userProject }),
          User.hasMany(models.Todo)
      }
    }
  });
  return User;
};
