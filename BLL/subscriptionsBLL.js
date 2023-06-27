const subscriptionsWS = require("../DAL/subscriptionsWS")

const getAllSubscriptions = async () => {
	return await subscriptionsWS.getAllSubscriptions()
}

module.exports = {
	getAllSubscriptions,
}
