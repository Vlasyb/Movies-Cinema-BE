const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/subscriptions`

const getAllSubscriptions = () => {
	return axios.get(url)
}

module.exports = {
	getAllSubscriptions,
}
