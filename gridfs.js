const crypto = require("crypto");
const config = require("./config");
const db = require("./connection");
const mongoose = require("mongoose");
const path = require('path');
const multer = require("multer");
//const test = require("gridfs-storage-engine")();
const GridFsStorage = require("multer-gridfs-storage");

//GridFS Configuration
 const storage = new GridFsStorage({
 	url: config.db.url,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads"
				};
				resolve(fileInfo);
			});
		});
	},
 	options: {useUnifiedTopology: true}
});
const conn = mongoose.createConnection(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
const upload = multer({storage});
var gfs;
//MAKE CALLBACK INSTEAD OF SET TIMEOUT//
setTimeout(function() {
	db.mongodb.connection.once("open", () => {
		// init stream
		gfs = new mongoose.mongo.GridFSBucket(conn, {
		  bucketName: "uploads"
		});
	});
}, 1000);

module.exports = {
	upload: upload,
	gfs: gfs
};