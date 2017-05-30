const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport');


// Require Models
let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');
let     User        = require('../models/userModel');

// Catch All Route
router.get('/', function (req, res) {
    res.render('Home', {
        page: 'Home'
    });
});

// Register NEW USER Form
router.get('/register', function (req, res) {
    res.render('users/newUser', {
        page: 'Register'
    });
});

// CREATE new User
router.post('/register', userToLowerCase, function (req, res) {
    let newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function () {
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
router.post('/login', userToLowerCase, passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function () {});

// LOGOUT User
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});


// Convert UN to LowerCase Middleware
function userToLowerCase(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    return next();
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
};

module.exports = router;