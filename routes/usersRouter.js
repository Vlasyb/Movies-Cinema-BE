const express = require("express")
const usersBLL = require("../BLL/usersBLL")

const router = express.Router()

router.post("/signuser", async (req, res) => {
	try {
		const obj = req.body
		const result = await usersBLL.createUser(obj)
		res.json(result)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

router.get("/", async (req, res) => {
	try {
		const users = await usersBLL.getAllUsers()
		res.json(users)
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send(error.message)
	}
})

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params
		const user = await usersBLL.getUserById(id)
		res.json(user)
	} catch (error) {
		console.log(error)
		res.status(500).send(error.message)
	}
})
//updating user with given id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params
		const obj = req.body
		result = await usersBLL.updateUser(id, obj)
		res.json(result)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
		result = await usersBLL.deleteUser(id)
		res.json(result)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

module.exports = router
