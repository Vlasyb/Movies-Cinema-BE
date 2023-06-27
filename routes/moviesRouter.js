const express = require("express")
const moviesBLL = require("../BLL/moviesBLL")

const router = express.Router()

router.get("/", async (req, res) => {
	try {
		console.log("router log")
		const { data: movies } = await moviesBLL.getAllMovies()
		res.status(200).json(movies)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

module.exports = router
