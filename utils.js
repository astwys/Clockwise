var bodyParser = require('body-parser');
var csrf = require('csurf');
var express = require('express');
var session = require('client-sessions');
var models = require('./models');

var middleware = require('./middleware');

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user object
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
module.exports.createUserSession = function(req, res, user) {
  var cleanUser = {
    username:   user.username,
    email:      user.email
  };

  req.session.user = cleanUser;
  req.user = cleanUser;
  res.locals.user = cleanUser;
};

/**
 * Create and initialize an Express application that is 'fully loaded' and
 * ready for usage!
 *
 * This will also handle setting up all dependencies (like database
 * connections).
 *
 * @returns {Object} - An Express app object.
 */
module.exports.createApp = function() {

  var app = express();

  // settings

  // view engine setup
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());


  // middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    cookieName: 'session',
    secret: 'keyboard cat',
    duration: 2 * 24 * 60 * 60 * 60,
    activeDuration: 60 * 60 * 60
  }));
  app.use(csrf());
  app.use(middleware.simpleAuth);

  // routes
  app.use(require('./routes/auth'));
  app.use(require('./routes/main'));
  app.use(require('./routes/error'));

  return app;
};

/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be redirected back to the login page.
 */
module.exports.requireLogin = function(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};
