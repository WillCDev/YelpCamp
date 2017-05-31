const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport');


// Require Models
let     middleware  = require('../middleware');
let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');
let     User        = require('../models/userModel');

// Catch All Route
router.get('/', function (req, res) {
    res.render('Home', {
        page: 'Home',
    });
});

// Register NEW USER Form
router.get('/register', function (req, res) {
    res.render('users/newUser', {
        page: 'Register'
    });
});

// CREATE new User
router.post('/register', middleware.userToLowerCase, function (req, res) {
    let newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong: " + err.message);
            return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Congrats. You have created an account. Welcome");
            res.redirect('/campgrounds');
        });
    });
});

// SHOW Login Route
router.get('/login', function (req, res) {
    res.render('users/login', {
        page: 'Login'
    });
});

// LOGIN User
router.post('/login', middleware.userToLowerCase, function (req, res){
    passport.authenticate("local", {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'   
    });
});

// LOGOUT User
router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out.");
    res.redirect('/campgrounds');
});

module.exports = router;