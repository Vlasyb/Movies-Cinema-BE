const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/members`

const getAllMembers = () => {
	return axios.get(url)
}

//change from movie
const getMemberById = (id) => {
	return axios.get(`${url}/movie/${id}`)
}

module.exports = {
	getMemberById,
	getAllMembers,
}
