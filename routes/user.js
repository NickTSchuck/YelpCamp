var express = require("express");
var router = express.Router();
const db = require("../connection");
const mongoose = require("mongoose");

// ===============================
// USER ROUTES
// ===============================
router.get("/userhome", (req, res) => {
    const userRequestData = {
          userid: req.user._id,
          username: req.user.username,
      };
      res.render("./users/userhome", {user: userRequestData});
});  

module.exports = router;