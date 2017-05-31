const   express = require('express');
const   router  = express.Router({mergeParams: true});

// Require Models
let     Campground  = require('../models/campgroundModel');
let     Comment     = require('../models/commentsModel');
let     User        = require('../models/userModel');
let     middleware  = require('../middleware');

// NEW Comment Route
router.get('/new', middleware.isLoggedIn, function (req, res) {
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
router.post('/', middleware.isLoggedIn, function (req, res) {
    // Lookup Campsite using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong: " + err.message);
            res.redirect('/campgrounds');
        } else {
            //Create Comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Something went wrong: " + err.message);
                    res.redirect('back');
                } else {
                    // Add Username and ID to Comment
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    //Save Comment
                    comment.save()
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT Comment Form Route
router.get('/:commentId/edit', middleware.checkCommentAuth, function (req, res) {
    Comment.findById(req.params.commentId, function (err, foundComment) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/editComment', {
                campground_id: req.params.id,
                comment: foundComment,
                page: 'Edit Comment'
            });
        }
    });
});

// UPDATE Comment Routes
router.put('/:commentId', middleware.checkCommentAuth, function (req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment){
        if (err){
            console.log(err);
            req.flash("error", "Something went wrong: " + err.message);
            res.redirect('back');
        } else {
            res.redirect('../');
        }
    });
});

// DESTROY Coment Route
router.delete('/:commentId', middleware.checkCommentAuth, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err, comment){
        if (err){
            console.log(err);
            req.flash("error", "Something went wrong: " + err.message);
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;