const express = require("express")
const moviesBLL = require("../BLL/moviesBLL")
const userMiddleware = require("../middleware/userMiddleware")
const permsMiddleware = require("../middleware/permsMiddleware")

const router = express.Router()

router.get(
	"/",
	userMiddleware.verifyToken,
	permsMiddleware.viewMoviesPerm,
	async (req, res) => {
		try {
			const { data: movies } = await moviesBLL.getAllMovies()
			res.status(200).json(movies)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.get(
	"/paginatedMovies/:page/:limit",
	userMiddleware.verifyToken,
	permsMiddleware.viewMoviesPerm,
	async (req, res) => {
		try {
			const { page, limit } = req.params
			const { data: movies } = await moviesBLL.paginatedMovies(page, limit)
			res.status(200).json(movies)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.get(
	"/movie/:id",
	userMiddleware.verifyToken,
	permsMiddleware.viewMoviesPerm,
	async (req, res) => {
		try {
			const { id } = req.params
			const { data: movie } = await moviesBLL.getMovieById(id)
			res.status(200).json(movie)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.get(
	"/nametoid/:name",
	userMiddleware.verifyToken,
	permsMiddleware.viewMoviesPerm,
	async (req, res) => {
		try {
			const { name } = req.params
			const { data: movieId } = await moviesBLL.getMovieIdByName(name)
			console.log(movieId)
			res.status(200).json(movieId)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

//get all movies by phrase (genres and name)
router.get(
	"/findmovie/:phrase",
	userMiddleware.verifyToken,
	permsMiddleware.viewMoviesPerm,
	async (req, res) => {
		try {
			const { phrase } = req.params
			const { data: movies } = await moviesBLL.getMoviesByPhrase(phrase)
			res.status(200).json(movies)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.get(
	"/nonWatchedMovies/:memberId",
	userMiddleware.verifyToken,
	permsMiddleware.viewMoviesPerm,
	async (req, res) => {
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
	}
)

router.post(
	"/",
	userMiddleware.verifyToken,
	permsMiddleware.createMoviesPerm,
	async (req, res) => {
		try {
			const obj = req.body
			const { data: result } = await moviesBLL.addMovie(obj)
			res.status(201).json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)
//unchecked
router.put(
	"/:id",
	userMiddleware.verifyToken,
	permsMiddleware.editMoviesPerm,
	async (req, res) => {
		try {
			const { id } = req.params
			const obj = req.body
			const { data: result } = await moviesBLL.updateMovie(id, obj)
			res.status(201).json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)
//delete movie + delete it in subscriptions if it exists
router.delete(
	"/:id",
	userMiddleware.verifyToken,
	permsMiddleware.deleteMoviesPerm,
	async (req, res) => {
		try {
			const { id } = req.params
			const { data: result } = await moviesBLL.deleteMovie(id)
			res.json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

module.exports = router
