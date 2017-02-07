'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    projectName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsToMany(models.User, { as: 'Members', through: models.userProject }),
        Project.hasMany(models.Entry)
      }
    }
  });
  return Project;
};
