// Require App Dependencies
const   express             = require('express'),
        ejs                 = require('ejs'),
        request             = require('request'),
        bodyParser          = require('body-parser'),
        methodOverride      = require('method-override'),
        mongoose            = require('mongoose'),
        passport            = require('passport'),
        localStrategy       = require('passport-local'),
        passportMongoose    = require('passport-local-mongoose'),
        session             = require('express-session'),
        flash               = require('connect-flash');

// Require Models
let     Campground  = require('./models/campgroundModel');
let     Comment     = require('./models/commentsModel');
let     User        = require('./models/userModel');
let     seedDB      = require('./seeds');

//Require Routes
let     campgroundRoutes = require('./routes/campgroundRoutes');
let     commentRoutes    = require('./routes/commentRoutes');
let     indexRoutes      = require('./routes/indexRoutes');

// Initiate App and Connect to DB
let app = express();
mongoose.connect("mongodb://localhost/yelp_camp");

// Initiate other App Dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash()); //<- Must be before Passport Config

// Setup View Engine and Static Files Paths
app.set('views',(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public/'));

// Passport Configuration
app.use(session({
    secret: "dnfed7n209unerf09n8ew0fd9n8we0fn",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make req.User available to all Templates
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// Initialize Routes
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

// seedDB();

// Set Ports and Initiate Server
const Port = process.env.PORT || 3000;
app.listen(Port, process.env.IP, function () {
    console.log('YelpCamp is now running...');
});