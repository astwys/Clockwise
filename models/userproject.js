'use strict';
module.exports = function(sequelize, DataTypes) {
  var userProject = sequelize.define('userProject', {
    teamleader: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userProject;
};
