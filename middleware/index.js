let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');

var middlewareObj = {

    isLoggedIn : function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("error", "You need to be Logged In to do that.");
            res.redirect("/login");
        }
    },

    userToLowerCase : function (req, res, next) {
        req.body.username = req.body.username.toLowerCase();
        return next();
    },

    checkCampgroundAuth : function (req, res, next) {
        // Check User is Logged In
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function (err, foundCampground) {
                if (err) {
                    console.log(err);
                } else {
                    // Check User Owns the Campsite
                    if (req.user._id.equals(foundCampground.author.id)) {
                        return next();
                    } else {
                        req.flash("error", "You do not have access to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be Logged In to do that.");
            res.redirect('back');
        }
    },

    checkCommentAuth : function (req, res, next) {
        // Check Logged In
        if (req.isAuthenticated()) {
            Comment.findById(req.params.commentId, function (err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    // Check User own the Comment
                    if (req.user._id.equals(foundComment.author.id)) {
                        return next();
                    } else {
                        req.flash("error", "You do not have access to do that.");
                        return res.redirect('back');
                    }
                }
            });
        } else {
            req.flash("error", "You need to be Logged In to do that.");
            res.redirect('/login');
        }
    },

    compareDates: function(commentDate){
        let  diffSec  = (Math.abs((new Date()) - commentDate))/1000; // Calculate the Time difference in Seconds
        let  diffMin  = Math.floor(diffSec/60), // round down
             diffHour = Math.floor(diffSec/(60*60)), // round down
             diffDay  = Math.floor(diffSec/(60*60*24)); // round down
        if (diffHour < 1){
            return diffMin + " mins ago";
        } else if (diffDay < 1 ){
            return diffHour + " hours ago";
        } else {
            return diffDay + " days ago";
        }
   }
};

module.exports = middlewareObj;