const   express = require('express');
const   router  = express.Router({mergeParams: true});

// Require Models
let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');
let     User        = require('../models/userModel');

// NEW Comment Route
router.get('/new', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/newComment', {
                page: 'New Comment',
                campground: campground
            });
        }
    });
});

// CREATE Comment Route
router.post('/', isLoggedIn, function (req, res) {
    // Lookup Campsite using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //Create Comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
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