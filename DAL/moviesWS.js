const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/movies`

const getAllMovies = () => {
	return axios.get(url)
}

const getMovieById = (id) => {
	return axios.get(`${url}/movie/${id}`)
}

const getMovieIdByName = (name) => {
	return axios.get(`${url}/nametoid/${name}`)
}

const getMoviesByPhrase = (phrase) => {
	return axios.get(`${url}/findmovie/${phrase}`)
}

const getNonWatchedMoviesForMember = (memberId) => {
	return axios.get(`${url}/nonWatchedMovies/${memberId}`)
}

const addMovie = (obj) => {
	return axios.post(url, obj)
}
const updateMovie = (id, obj) => {
	return axios.put(`${url}/${id}`, obj)
}
const deleteMovie = (id) => {
	return axios.delete(`${url}/${id}`, id)
}

module.exports = {
	getMovieById,
	getAllMovies,
	addMovie,
	deleteMovie,
	updateMovie,
	getNonWatchedMoviesForMember,
	getMoviesByPhrase,
	getMovieIdByName,
}
