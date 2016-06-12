var express = require('express');

// ---------
var path = require('path');
// ---------

var utils = require('../utils');
var models = require('../models');

var router = express.Router();

// home page
router.get('/', function(req, res) {
    res.render('index');
    // res.sendFile(__dirname + '/../public/html/test.html');
    // res.sendFile(path.resolve('public/html/test.html'));
});

//time page
router.get('/time', utils.requireLogin, function(req, res) {
    res.render('time', { name: 'Time' });
});

// display page to create new project
router.get('/newproject', utils.requireLogin, function(req, res) {
    models.User.findAll({ where: [ "username not like ?", req.session.user.username ] }).then(function(users) {
        res.render('newproject', { users: users,  csrfToken: req.csrfToken() });
    });
});

// process new project
router.post('/newproject', function(req, res) {
    models.Project.create({ projectName: req.body.name }).then(function(project) {
        models.User.findOne({ where: { username: req.session.user.username } }).then(function(user) {
            user.addProject(project, { teamleader: true });
        }).then(function() {
            models.User.findOne({ where: { id: req.body.members } }).then(function(user) {
                user.addProject(project, { teamleader: false });
            });
        });
    }).then(function() {
        res.redirect('/time');
    }).error(function(err) {
        res.render('time', { name: 'Time', error: 'Something bad happened! Please try again!' });
    });
});

router.get('/projects', utils.requireLogin, function(req, res) {
    models.User.findOne({ where: { username: req.session.user.username } }).then(function(user) {
        user.getProjects({
            include: [{
                model: models.User,
                as: 'Members'
            }]
        }).then(function(projects) {
            res.render('projects', { name: 'Projects', projects: projects });
        }).error(function(err) {
            res.render('projects', { name: 'Projects', error: 'Couldn\'t load projects.' });
        });
    });
});

router.get('/todos', utils.requireLogin, function(req, res) {
    res.render('todos', { name: 'Todos' });
});

router.get('/account', utils.requireLogin, function(req, res) {
    res.render('account');
});

module.exports = router;
