// Require Dependencies
const   express     = require('express');
let     app         = express();
const   ejs         = require('ejs'),
        request     = require('request'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose');

// Required Models
let Campground = require('./models/campground');
let Comment = require('./models/comments');
let seedDB = require('./seeds');

// Setup Required Modules
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Setup View Engine and Static Files Paths
app.set('views',(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public/'));

seedDB();

/******************** ROUTES ********************/

app.get('/',function(req,res){
    res.render('Home',{page:'Home'});
});

// INDEX - Show all Campgrounds
app.get('/campgrounds',function(req,res){
    // Get all Campgrounds
    Campground.find({}, function(err, results){
        if (err) {
            console.log('There was an erroe');
            console.log(err);
        } else {
            res.render('campgrounds/index',{campgrounds:results, page:'CampGrounds'});
        }
    });
});

// CREATE - Add new campground to DB
app.post('/campgrounds', function(req,res){
    // get data from form
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newItem = {name:name, image:image, description: desc};
    // add to campsite array
    Campground.create(newItem,function(err,result){
        if (err){
            console.log('There was an Error');
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW - Show Form to create new Campground
app.get('/campgrounds/new', function(req,res) {
    res.render('newCampGround',{page:'New CampGround'});
});

// SHOW - Show a single Campground
app.get("/campgrounds/:id", function(req,res){
    // Find the Camp Ground with the requested ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,result){
        if (err) {
            console.log(err);
        } else {
            res.render('showCampGround', {page:'Campsite Info', campground:result});
        }
    });
});

// ===================
// COMMENTS ROUTES
// ===================
app.get('/campgrounds/:id/comments/new', function(req, res){
    res.render('comments/newComment', {page:'New Comment'});
})

/************* Set Ports and Initiate Server *************/
const Port = process.env.PORT || 3000;
app.listen(Port, process.env.IP, function(){
    console.log('YelpCamp is now running...');
});