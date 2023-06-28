const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			select: false, //to not show the password in get req
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false }
)

const User = mongoose.model("users", userSchema)

module.exports = User
