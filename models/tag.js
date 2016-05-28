'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          Tag.belongsTo(models.Project)
      }
    }
  });
  return Tag;
};
