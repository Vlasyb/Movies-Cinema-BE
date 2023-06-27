const membersWS = require("../DAL/membersWS")

const getAllMembers = async () => {
	return await membersWS.getAllMembers()
}

const getMemberById = async (id) => {
	return await membersWS.getMemberById(id)
}
const addMember = async (obj) => {
	const result = await membersWS.addMember(obj)
	return result
}

const updateMember = async (id, obj) => {
	const result = await membersWS.updateMember(id, obj)
	return result
}

const deleteMember = async (id) => {
	const result = await membersWS.deleteMember(id)
	return result
}

module.exports = {
	getMemberById,
	addMember,
	updateMember,
	deleteMember,
	getAllMembers,
}
