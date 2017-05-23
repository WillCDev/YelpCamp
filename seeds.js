const mongoose = require('mongoose');
const Campground = require('./models/campground');

let data = [{
        name: "Festival Hills",
        image: "http://www.switchbacktravel.com/sites/default/files/images/articles/Camping%20Tents.jpg",
        description: "Beautiful lighting and hot tubs. Campfire with music, or just sit and watch the stars!"
    },
    {
        name: "Glades Retreat",
        image: "http://www.highlightpress.com/wp-content/uploads/2017/02/camping-voyageurs-national-park-tent.jpg.rend_.tccom_.1280.960.jpeg",
        description: "Stunnign forest retreat. Bring an Axe and chop your own firewood and a fishing rod for catchin dinner!"
    },
    {
        name: "Cosy Canyon",
        image: "http://dm3381rcqf07k.cloudfront.net/multisite.insomniac.com/wp-content/uploads/sites/26/2016/12/Knights-Quarters-366x244.jpg",
        description: "Glamping at it's best."
    },
    {
        name: "Tipi Village",
        image: "http://knivstanatur.se/wp-content/uploads/sites/40/2017/03/Camping.jpg",
        description: "Communal Glamping. Living outdoors with the comforts of home."
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Campgrounds Removed');
            data.forEach(function (seed) {
                Campground.create(seed, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Seed Added');
                    }
                });
            });
        }
    });
};