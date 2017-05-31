const   express = require('express');
const   router  = express.Router();
const   methodOverride = require('method-override');

// Require Models & Middleware
let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');
let     User        = require('../models/userModel');
let     middleware  = require('../middleware');

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
router.get('/new', middleware.isLoggedIn,  function (req, res) {
    res.render('campgrounds/newCampGround', {
        page: 'New CampGround'
    });
});

// CREATE - Add new campground to DB
router.post('/', middleware.isLoggedIn, function (req, res) {
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
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/showCampGround', {
                page: 'Campsite Info',
                campground: foundCampground
            });
        }
    });
});

// EDIT - Show edit Campground form
router.get('/:id/edit', middleware.checkCampgroundAuth, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log.apply(err)
        } else {
            res.render('campgrounds/editCampground', {
                page: 'Edit Campground',
                campground: foundCampground
            });
        }
    });
});

// UPDATE Campground Route
router.put('/:id', middleware.checkCampgroundAuth, function (req, res) {
    // Find and Update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.redirect("back");
        }
    });
});

// DESTROY Campground Route
router.delete('/:id', middleware.checkCampgroundAuth, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCamground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;