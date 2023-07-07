const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const usersBLL = require("../BLL/usersBLL")

const secret = process.env.ACCESS_TOKEN_SECRET

const isAuth = async (req, res, next) => {
	const { username, password } = req.body

	const userDB = await User.findOne({ username: username }).select("+password")
	console.log(userDB)
	if (!userDB) {
		return res.status(401).json({ message: "Invalid email or password" })
	}
	const isPasswordMatch = await bcrypt.compare(password, userDB.password)
	if (!isPasswordMatch) {
		return res.status(401).json({ message: "Invalid email or password" })
	}
	if (!userDB.isAdmin) {
		const fullUser = await usersBLL.getUserById(userDB.id)
		fullUser.password = undefined
		req.body.user = fullUser //needs to be the full user
	} else {
		userDB.password = undefined
		req.body.user = {
			id: userDB._id,
			username: userDB.username,
			isAdmin: userDB.isAdmin,
		}
	}
	next()
}

//verifying jwt token
const verifyToken = async (req, res, next) => {
	const { token } = req.cookies
	if (!token) return res.status(401).json({ message: "Token required" })
	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "failed to authenticate token" })
		}
		req.user = user
		next()
	})
}
//only used after verifyToken (which puts user into req)
const isAdmin = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if (user.isAdmin) {
			next()
			return
		}
		return res
			.status(401)
			.json({ message: "only Admin can access this information" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}

module.exports = {
	isAdmin,
	isAuth,
	verifyToken,
}
