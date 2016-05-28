'use strict';
module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('Entry', {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Entry.belongsTo(models.Project),
        Entry.belongsTo(models.User),
        Entry.hasMany(models.Tag)
      }
    }
  });
  return Entry;
};
