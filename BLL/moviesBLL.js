const moviesWS = require("../DAL/moviesWS")

const getAllMovies = async () => {
	return await moviesWS.getAllMovies()
}

const getMovieById = async (id) => {
	return await moviesWS.getMovieById(id)
}
const addMovie = async (obj) => {
	const result = await moviesWS.addMovie(obj)
	return result
}
const updateMovie = async (id, obj) => {
	const result = await moviesWS.updateMovie(id, obj)
	return result
}
const getMovieIdByName = async (givenName) => {
	const movieId = await moviesWS.getMovieIdByName(givenName)
	return movieId
}
const getNonWatchedMoviesForMember = async (memberId) => {
	const movies = await moviesWS.getNonWatchedMoviesForMember(memberId)
	return movies
}
const getMoviesByPhrase = async (phrase) => {
	const movies = await moviesWS.getMoviesByPhrase(phrase)
	return movies
}
const deleteMovie = async (id) => {
	const result = await moviesWS.deleteMovie(id)
	return result
}

module.exports = {
	deleteMovie,
	getMoviesByPhrase,
	getNonWatchedMoviesForMember,
	getMovieIdByName,
	updateMovie,
	addMovie,
	getAllMovies,
	getMovieById,
}
