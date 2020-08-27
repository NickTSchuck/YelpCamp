var express = require("express");
var router = express.Router();
const db = require("../connection");

// ===============================
// COMMENTS ROUTES
// ===============================
router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
	db.mongodb.models.campground.findById(req.params.id, (err, foundCampground) => {
		err ? console.log(err) : res.render("./comments/new", {campground: foundCampground});
	});
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	db.mongodb.models.campground.findById(req.params.id, function (err, foundCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds/" + foundCampground._id);
		} else {			
			db.mongodb.models.comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
					res.redirect("/campgrounds/" + foundCampground._id);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCampground.comments.push(comment);
					foundCampground.save();
					res.redirect("/campgrounds/" + foundCampground._id);
				}
			});
		}
	});
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
		req.session.redirectTo = req.path;
        res.redirect("/login");
    }
}

module.exports = router;