const express = require("express")
const subscriptionsBLL = require("../BLL/subscriptionsBLL")

const router = express.Router()

router.get("/", async (req, res) => {
	try {
		const { data: subscriptions } = await subscriptionsBLL.getAllSubscriptions()
		res.status(200).json(subscriptions)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

module.exports = router
