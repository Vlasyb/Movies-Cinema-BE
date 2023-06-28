const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/subscriptions`

const getAllSubscriptions = () => {
	return axios.get(url)
}
const getSubscriptionsForMovieId = (movieId) => {
	return axios.get(`${url}/membersWatched/${movieId}`)
}
const getSubscriptionsForMember = (memberId) => {
	return axios.get(`${url}/subscriptions/${memberId}`)
}
const subscribeToMovie = (movieId, obj) => {
	return axios.put(`${url}/subscribe/${movieId}`, obj)
}
const getSubscriptionById = (id) => {
	return axios.get(`${url}/subscription/${id}`)
}

module.exports = {
	getSubscriptionsForMovieId,
	getSubscriptionsForMember,
	subscribeToMovie,
	getAllSubscriptions,
	getSubscriptionById,
}
