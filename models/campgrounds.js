const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
	name: String,
	image : String,
	description: String,
	host: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	},
	comments: [
		{
		   type: mongoose.Schema.Types.ObjectId,
		   ref: "comment"
		}
	 ]
});

module.exports = campgroundSchema;  