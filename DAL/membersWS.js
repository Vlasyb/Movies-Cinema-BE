const axios = require("axios")
const port = "8036"
const url = `http://localhost:${port}/members`

const getAllMembers = () => {
	return axios.get(url)
}

const getMemberById = (id) => {
	return axios.get(`${url}/member/${id}`)
}

const addMember = (obj) => {
	return axios.post(url, obj)
}
const updateMember = (id, obj) => {
	return axios.put(`${url}/${id}`, obj)
}
const deleteMember = (id) => {
	return axios.delete(`${url}/${id}`, id)
}

module.exports = {
	addMember,
	updateMember,
	deleteMember,
	getMemberById,
	getAllMembers,
}
