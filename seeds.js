var monogoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
    {
        name: "The Black Forest, Germany",
        image: "https://cdn.onlyinyourstate.com/wp-content/uploads/2016/05/forest.png",
        description: "This is a filler description."
    },
    {
        name: "Portland, Oregon Beach Camp",
        image: "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1516125062/olympic-national-park-washington-SCENICCAMP0118.jpg?itok=uCnmF02B",
        description: "This is a filler description."
    },
    {
        name: "Sawtooth National Forest",
        image: "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1516125062/sawtooth-national-forest-idaho-SCENICCAMP0118.jpg?itok=Bcp2AmTm",
        description: "This is a filler description."
    }
]


function seedDB() {
    Campground.deleteMany({}, function(err) {
        err ? console.log(err) : data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                err ? console.log(err) : function() {
                    console.log(campground);
                    
                    //Create Comment for current record
                    Comment.create({                      
                            text: "This is a filler comment provided by the seed data process.",
                            author: "Anonymous"
                    }, (err, comment) => {
                        err ? console.log(err) : campground.comments.push(comment);
                        campground.save();
                    });
               }();
            });    
        });
    });
}

module.exports = seedDB;