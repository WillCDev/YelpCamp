const mongoose = require('mongoose');
const Campground = require('./models/campgroundModel');
const Comment = require('./models/commentsModel');

const genDescription = "Sister bacon super rage anonymous woman crying i lied one does not simply blizzard facebook keyboard. Sexy time scumbag win movie woman in the kitchen bear not bad on feel like a sir thor. So Hardcore le girlfriend simpson oh stop it, you finals good guy lois i'm watching u true love. Charlie Sheen lose stoned female mother fuuuuuuuuuuccckkkkkk boobs love avenger. Collection le derp eat angry birds pikachu note men father. Grin michelle facepalm just okay le friend cellphone if you know what i mean cat monday diablo 3. Megusta fap computer venenatis you don't say? Amet resident evil dolar clinton easter in gasp essay. Derp 9000 food sex gtfo nerd cereal guy students luke so close lol. Like a boss right mother of god y u no nap scared homework gentlemen. Always not okay freddie mercury.";

let data = [{
        name: "Festival Hills",
        image: "http://www.switchbacktravel.com/sites/default/files/images/articles/Camping%20Tents.jpg",
        description: genDescription
    },
    {
        name: "Glades Retreat",
        image: "http://www.highlightpress.com/wp-content/uploads/2017/02/camping-voyageurs-national-park-tent.jpg.rend_.tccom_.1280.960.jpeg",
        description: genDescription
    },
    {
        name: "Cosy Canyon",
        image: "http://dm3381rcqf07k.cloudfront.net/multisite.insomniac.com/wp-content/uploads/sites/26/2016/12/Knights-Quarters-366x244.jpg",
        description: genDescription
    },
    {
        name: "Tipi Village",
        image: "http://knivstanatur.se/wp-content/uploads/sites/40/2017/03/Camping.jpg",
        description: genDescription
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Campgrounds Removed');
            Comment.remove({}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    data.forEach(function (seed) {
                        Campground.create(seed, function (err, campground) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Seed Added');
                                Comment.create({
                                    text: "This is a generic Comment",
                                    author: "Will.I.Am"
                                }, function (err, comment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log('Comment Saved');
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
};

module.exports = seedDB;