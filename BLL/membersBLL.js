const membersWS = require("../DAL/membersWS")

const getAllMembers = async () => {
	return await membersWS.getAllMembers()
}

module.exports = {
	getAllMembers,
}
