const express = require("express")
const moviesBLL = require("../BLL/moviesBLL")

const router = express.Router()

router.get("/", async (req, res) => {
	try {
		const { data: movies } = await moviesBLL.getAllMovies()
		res.status(200).json(movies)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

router.get("/movie/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { data: movie } = await moviesBLL.getMovieById(id)
		res.status(200).json(movie)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

router.get("/nametoid/:name", async (req, res) => {
	try {
		const { name } = req.params
		const { data: movieId } = await moviesBLL.getMovieIdByName(name)
		console.log(movieId)
		res.status(200).json(movieId)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

//get all movies by phrase (genres and name)
router.get("/findmovie/:phrase", async (req, res) => {
	try {
		const { phrase } = req.params
		const { data: movies } = await moviesBLL.getMoviesByPhrase(phrase)
		res.status(200).json(movies)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

router.get("/nonWatchedMovies/:memberId", async (req, res) => {
	try {
		const { memberId } = req.params
		const { data: movies } = await moviesBLL.getNonWatchedMoviesForMember(
			memberId
		)
		res.status(200).json(movies)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

router.post("/", async (req, res) => {
	try {
		const obj = req.body
		const { data: result } = await moviesBLL.addMovie(obj)
		res.status(201).json(result)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})
//unchecked
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params
		const obj = req.body
		const { data: result } = await moviesBLL.updateMovie(id, obj)
		res.status(201).json(result)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})
//delete movie + delete it in subscriptions if it exists
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { data: result } = await moviesBLL.deleteMovie(id)
		res.json(result)
	} catch (error) {
		console.log("Error occurred in Cinema backend:", error)
		res.status(500).send("Internal Server Error")
	}
})

module.exports = router
