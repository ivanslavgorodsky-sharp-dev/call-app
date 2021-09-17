const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactScheme = new Schema({
		userId : {
			type: Schema.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		}
	},
	{ versionKey: false });

module.exports = mongoose.model("Contact", contactScheme);
