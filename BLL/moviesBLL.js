const moviesWS = require("../DAL/moviesWS")

const getAllMovies = async () => {
	const movies = await moviesWS.getAllMovies()
	return movies
}

module.exports = {
	getAllMovies,
}
