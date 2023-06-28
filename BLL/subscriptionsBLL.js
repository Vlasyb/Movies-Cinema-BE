const subscriptionsWS = require("../DAL/subscriptionsWS")

const getAllSubscriptions = async () => {
	return await subscriptionsWS.getAllSubscriptions()
}

const getSubscriptionById = async (id) => {
	return await subscriptionsWS.getSubscriptionById(id)
}

const getSubscriptionsForMember = async (memberId) => {
	const subscriptions = await subscriptionsWS.getSubscriptionsForMember(
		memberId
	)
	return subscriptions
}

const getSubscriptionsForMovieId = async (movieId) => {
	const subscriptions = await subscriptionsWS.getSubscriptionsForMovieId(
		movieId
	)
	return subscriptions
}

const subscribeToMovie = async (memberId, movieId, date) => {
	return await subscriptionsWS.subscribeToMovie(movieId, {
		memberId: memberId,
		date: date,
	})
}

module.exports = {
	getSubscriptionsForMovieId,
	getSubscriptionsForMember,
	subscribeToMovie,
	getAllSubscriptions,
	getSubscriptionById,
}
