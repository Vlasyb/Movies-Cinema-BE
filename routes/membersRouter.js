const express = require("express")
const membersBLL = require("../BLL/membersBLL")

const router = express.Router()

router.get("/", async (req, res) => {
	try {
		const { data: members } = await membersBLL.getAllMembers()
		res.status(200).json(members)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

module.exports = router
