const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/members`

const getAllMembers = () => {
	return axios.get(url)
}

module.exports = {
	getAllMembers,
}
