const express = require("express")
const usersBLL = require("../BLL/usersBLL")
const userMiddleware = require("../middleware/userMiddleware")

const router = express.Router()

//userMiddleware.verifyToken is added to every request but login,logout,register
//isAdmin is required for all request but logout,login,register
router.get("/logout", usersBLL.logout)

router.get("/verify", userMiddleware.verifyToken, usersBLL.sendUserDetails)

router.post("/login", userMiddleware.isAuth, usersBLL.login)

router.post(
	"/signuser",
	userMiddleware.isAuth,
	userMiddleware.isAdmin,
	async (req, res) => {
		try {
			const obj = req.body
			const result = await usersBLL.createUser(obj)
			res.json(result)
		} catch (error) {
			console.log(error)
			return res.status(500).send(error.message)
		}
	}
)

router.post("/register", async (req, res) => {
	try {
		const obj = req.body
		const result = await usersBLL.createExistingUser(obj)
		res.json(result)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

router.get(
	"/",
	userMiddleware.verifyToken,
	userMiddleware.isAdmin,
	async (req, res) => {
		try {
			const users = await usersBLL.getAllUsers()
			res.json(users)
		} catch (error) {
			console.log("error ", error)
			return res.status(500).send(error.message)
		}
	}
)

router.get(
	"/:id",
	userMiddleware.verifyToken,
	userMiddleware.isAdmin,
	async (req, res) => {
		try {
			const { id } = req.params
			const user = await usersBLL.getUserById(id)
			res.json(user)
		} catch (error) {
			console.log(error)
			res.status(500).send(error.message)
		}
	}
)
//updating user with given id
router.put(
	"/:id",
	userMiddleware.verifyToken,
	userMiddleware.isAdmin,
	async (req, res) => {
		try {
			const { id } = req.params
			const obj = req.body
			result = await usersBLL.updateUser(id, obj)
			res.json(result)
		} catch (error) {
			console.log(error)
			return res.status(500).send(error.message)
		}
	}
)

router.delete(
	"/:id",
	userMiddleware.verifyToken,
	userMiddleware.isAdmin,
	async (req, res) => {
		try {
			const { id } = req.params
			result = await usersBLL.deleteUser(id)
			res.json(result)
		} catch (error) {
			console.log(error)
			return res.status(500).send(error.message)
		}
	}
)

module.exports = router
