const mongoose  = require('mongoose');
let   Comment   = require('../models/commentsModel');
let   User      = require('../models/userModel');

let campgroundSchema = new mongoose.Schema({
    name: {type: String, require: true}
    price: {type: Number, required: true}
    image: String,
    description: String,
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comments"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Campgrounds",campgroundSchema);