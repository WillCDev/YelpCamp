const mongoose  = require('mongoose');
let   Comment   = require('../models/commentsModel');

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comments"
    }]
});

module.exports = mongoose.model("Campgrounds",campgroundSchema);