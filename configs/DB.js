const mongoose = require("mongoose")

const connectDB = () => {
	mongoose
		.connect("mongodb://127.0.0.1:27017/users", {
			serverSelectionTimeoutMS: 5000, // 5 seconds timeout
		})
		.then(() => {
			console.log("Connected to users db")
		})
		.catch((error) => {
			console.log(error)
		})
}

module.exports = connectDB
