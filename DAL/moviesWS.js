const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/movies`

const getAllMovies = () => {
	return axios.get(url)
}

module.exports = {
	getAllMovies,
}
