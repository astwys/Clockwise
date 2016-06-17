var express = require('express');
var $ = require('jquery');

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
    res.render('time', { title: 'Time' });
});

// display page to create new project
router.get('/newproject', utils.requireLogin, function(req, res) {
    models.User.findAll({ where: [ "username not like ?", req.session.user.username ] }).then(function(users) {
        res.render('newproject', { title: 'New Project', users: users,  csrfToken: req.csrfToken() });
    });
});

// process new project
router.post('/newproject', function(req, res) {
    models.Project.create({ projectName: req.body.name }).then(function(project) {
        models.User.findOne({ where: { username: req.session.user.username } }).then(function(user) {
            user.addProject(project, { teamleader: true });
        }).then(function() {
            req.body.members.forEach(function(userID) {
                models.User.find({ where: { id: userID } }).then(function(user) {
                    user.addProject(project, { teamleader: false });
                });
            });
        });
    }).then(function() {
        res.redirect('/projects');
    }).error(function(err) {
        res.render('time', { title: 'Time', error: 'Something bad happened! Please try again!' });
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
            res.render('projects', { title: 'Projects', projects: projects });
        }).error(function(err) {
            res.render('projects', { title: 'Projects', error: 'Couldn\'t load projects.' });
        });
    });
});

router.get('/edit/:project', utils.requireLogin, function(req, res) {
    models.User.findOne({ where: { username: req.session.user.username } }).then(function(user) {
        user.getProjects({ 
            where: { id: req.params.project },
            include: [{
                model: models.User,
                as: 'Members'
            }]
        }).then(function(projects) {
            res.render('edit', { title: 'Edit', project: projects[0], csrfToken: req.csrfToken() });
        });
    });
});

router.post('/edit/:project', function(req, res) {

    console.log("----------------------------------")
    console.log(req.body.delete)
    console.log("----------------------------------")
    if (req.body.rename != null) {
        models.Project.findOne({ where: { id: req.params.project } }).then(function(project) {
            project.update({
                projectName: req.body.name
            }).then(function() {
                res.redirect('/edit/' + req.params.project);
            });
        });
    } else if (req.body.delete != null) {
        models.Project.findOne({ where: { id: req.params.project } }).then(function(project) {
            project.destroy();
        }).then(function() {
            res.redirect('/projects');
        });
    }
});

router.get('/edit/remove/:project/:user', utils.requireLogin, function(req, res) {
    models.Project.findOne({ where: { id: req.params.project } }).then(function(project) {
        models.User.findOne({ where: { id: req.params.user } }).then(function(user) {
            user.removeProject(project);
        }).then(function() {
            // res.render('edit/' + req.params.project, { title: 'Edit', project: project });
            res.redirect('/edit/' + req.params.project);
        });
    });
});


router.get('/todos', utils.requireLogin, function(req, res) {
    res.render('todos', { title: 'Todos' });
});

router.get('/account', utils.requireLogin, function(req, res) {
    res.render('account');
});

module.exports = router;
