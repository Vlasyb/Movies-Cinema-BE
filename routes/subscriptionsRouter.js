const express = require("express")
const subscriptionsBLL = require("../BLL/subscriptionsBLL")
const userMiddleware = require("../middleware/userMiddleware")

const router = express.Router()

router.get("/", userMiddleware.verifyToken, async (req, res) => {
	try {
		const { data: subscriptions } = await subscriptionsBLL.getAllSubscriptions()
		res.status(200).json(subscriptions)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

router.get(
	"/subscription/:id",
	userMiddleware.verifyToken,
	async (req, res) => {
		try {
			const { id } = req.params
			const { data: subscription } = await subscriptionsBLL.getSubscriptionById(
				id
			)
			res.status(200).json(subscription)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)
//get all subscriptions for memberId
router.get(
	"/subscriptions/:memberId",
	userMiddleware.verifyToken,
	async (req, res) => {
		try {
			const { memberId } = req.params
			const { data: subscriptions } =
				await subscriptionsBLL.getSubscriptionsForMember(memberId)
			res.status(200).json(subscriptions)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)
//get all members watched + date for a movie
router.get(
	"/membersWatched/:movieId",
	userMiddleware.verifyToken,
	async (req, res) => {
		try {
			const { movieId } = req.params
			const { data: membersWatched } =
				await subscriptionsBLL.getSubscriptionsForMovieId(movieId)
			res.status(200).json(membersWatched)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)
//subscribe a member to movie
router.put(
	"/subscribe/:movieId",
	userMiddleware.verifyToken,
	async (req, res) => {
		try {
			const { movieId } = req.params
			const { memberId, date } = req.body
			const { data: result } = await subscriptionsBLL.subscribeToMovie(
				memberId,
				movieId,
				date
			)
			res.status(201).json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

module.exports = router
