const   express = require('express');
const   router  = express.Router();

// Require Models
let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');
let     User        = require('../models/userModel');

// INDEX - Show all Campgrounds
router.get('/', function (req, res) {
    // Get all Campgrounds
    Campground.find({}, function (err, results) {
        if (err) {
            console.log('There was an error');
            console.log(err);
        } else {
            res.render('campgrounds/index', {
                campgrounds: results,
                page: 'CampGrounds',
                currentUser: req.user
            });
        }
    });
});

// NEW - Show Form to create new Campground
router.get('/new', isLoggedIn,  function (req, res) {
    res.render('campgrounds/newCampGround', {
        page: 'New CampGround'
    });
});

// CREATE - Add new campground to DB
router.post('/', isLoggedIn, function (req, res) {
    // get data from form
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newItem = {
        name: name,
        image: image,
        description: desc,
        author: author
    };
    // add to campsite array
    Campground.create(newItem, function (err, result) {
        if (err) {
            console.log('There was an Error');
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// SHOW - Show a single Campground
router.get("/:id", function (req, res) {
    // Find the Camp Ground with the requested ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/showCampGround', {
                page: 'Campsite Info',
                campground: campground
            });
        }
    });
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