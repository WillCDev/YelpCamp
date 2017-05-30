const   mongoose            = require('mongoose'),
        passportMongoose    = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username: { type: String, unique: true, lowercase: true},
    password: String
});

userSchema.plugin(passportMongoose);

module.exports = mongoose.model("User", userSchema);