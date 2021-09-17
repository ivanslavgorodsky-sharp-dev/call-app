const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionScheme = new Schema({
		userId : {
			type: Schema.ObjectId,
			required: true,
		},
		amount: {
			type: Number,
			required: true
		},
		balance: {
			type: Number,
			required: true
		}
	},
	{ versionKey: false });

module.exports = mongoose.model("Transaction", transactionScheme);
