'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    estimatedTime: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
          Todo.belongsTo(models.Entry)
      }
    }
  });
  return Todo;
};
