//Require Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const config = require("./config.js");
const db = require("./connection");
const seedDB = require("./seeds.js");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Require Routes
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");

//Seed the database
//seedDB();

//Passport Configuration
app.use(require("express-session")({
	secret: "Secret message used to sign the session ID",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.mongodb.models.user.authenticate()));
passport.serializeUser(db.mongodb.models.user.serializeUser());
passport.deserializeUser(db.mongodb.models.user.deserializeUser());


app.use((req, res, next) => {
	console.log(req.path);
	res.locals.currentUser = req.user;
	next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(userRoutes);
app.use(indexRoutes);

app.listen(config.app.port, () => {
	console.log("App is listening...");
});