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
	const fullUser = await usersBLL.getUserById(userDB.id)
	req.body.user = fullUser //needs to be the full user
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

module.exports = {
	isAuth,
	verifyToken,
	// tookAction,
	// getAllUsers,
	// doLogout,
}
