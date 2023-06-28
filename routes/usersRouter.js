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

module.exports = router
