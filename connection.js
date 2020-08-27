const config = require("./config")
const mongoose = require("mongoose");

const conn = mongoose.createConnection(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    mongodb: {
        connection: conn,
        models: {
            user: conn.model("user", require("./models/users")),
            comment: conn.model("comment", require("./models/comments")),
            campground: conn.model("campground", require("./models/campgrounds"))
        }
    }
}
