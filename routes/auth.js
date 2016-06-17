var bcrypt = require('bcryptjs');
var express = require('express');

var models = require('../models');
var utils = require('../utils');

var router = express.Router();


// render register page
router.get('/register', function(req, res) {
    res.render('register', {title: 'Register', csrfToken: req.csrfToken() });
});


// create new user
router.post('/register', function(req, res) {
    if (req.body.username === "" || req.body.email === "" || req.body.password === "") {
        res.render('register', { title: 'Register', error: 'Please fill in all fields.', csrfToken: req.csrfToken() });
        return;
    }

    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    var user = {
        username: req.body.username,
        email: req.body.email,
        password: hash
    }

    models.User.create(user).then(function() {
        utils.createUserSession(req, res, user)
        res.redirect('/time');
    });
});

// render login page
router.get('/login', function(req, res) {
    res.render('login', { title: 'Login', csrfToken: req.csrfToken() });
});

// log user into account
router.post('/login', function(req, res) {
    models.User.findOne({ where: { username: req.body.username } }).then(function(user) {
        if (!user) {
            res.render('login', {
                name: 'Login',
                csrfToken: req.csrfToken(),
                error: 'couldn\'t find user'
            });
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                utils.createUserSession(req, res, user);
                res.redirect('/time');
            } else {
                res.render('login', {
                    title: 'Login',
                    csrfToken: req.csrfToken(),
                    error: 'incorrect username or password'
                });
            }
        }
    });
});

// logout user and redirct to index
router.get('/logout', function(req, res) {
    if (req.session) {
        req.session.reset();
    }
    res.redirect('/');
});

module.exports = router;
