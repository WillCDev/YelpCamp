const mongoose = require('mongoose'),
      User     = require('../models/userModel');

let commentSchema = new mongoose.Schema({
    text : String,
    dateCreated: { type: Date, default: Date.now },
    author : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model("Comments", commentSchema);