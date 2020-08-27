var express = require("express");
var router = express.Router();
const db = require("../connection");

// ===============================
// CAMPGROUND ROUTES
// ===============================
router.get("/campgrounds", (req, res) => {
	//Get all camogrounds from mongodb	
	db.mongodb.models.campground.find({},  (err, Campgrounds) => {
        err ? console.log("err") : res.render("./campgrounds/index", {campgrounds : Campgrounds});
	});
});

router.post("/campgrounds", (req, res) => {
	const name = req.body.name;
	const imgurl = req.body.imgurl;
	const description = req.body.description
	const userID = req.user._id;
	const userName = req.user.username;
	const newCampground = { name: name, 
							image: imgurl, 
							description: description,
							host: {
								id: userID,
								username: userName
							}
						};
	console.log(newCampground);
	db.mongodb.models.campground.create(newCampground, (err, newRecord) => {
		err ? console.log(err) : res.redirect("/campgrounds");
    });
});

router.get("/campgrounds/new", (req, res) => {
	res.render("./campgrounds/new"); 
});

router.get("/campgrounds/:id", (req, res) => {
	//find campground with query string parameter id
	db.mongodb.models.campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        err ? console.log(err) : res.render("./campgrounds/show", {campground: foundCampground});
	});	
});

module.exports = router;