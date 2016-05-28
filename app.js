var models = require('./models');
var utils = require('./utils');

models.sequelize.sync().then(function() {
    utils.createApp().listen(3000, function() {
        console.log("App started on http://localhost:3000 press Crtl-C to terminate");
    });
});
