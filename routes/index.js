var express = require("express");
var router = express.Router();
const passport = require("passport");
const db = require("../connection");

// ===============================
// HOME ROUTE
// ===============================
router.get("/", (req, res) => {
	res.render("landing");
});

// ===============================
// AUTH ROUTES
// ===============================
router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	let newUser = new db.mongodb.models.user({username: req.body.username});
	db.mongodb.models.user.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render("register");
		} 

		passport.authenticate("local")(req, res, () => {
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login"} ), (req, res) => {
	const redirectTo = req.session.redirectTo || "/campgrounds";
	delete req.session.redirectTo;
	res.redirect(redirectTo);
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

// ===============================
// MISC ROUTES
// ===============================
router.get("*", (req, res) => {
	res.send("Resource not found!") 
});

module.exports = router;