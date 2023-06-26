const jsonfile = require("jsonfile")
const path = require("path")

const file = path.join(__dirname, "../data/users.json")

const getUsers = () => {
	return jsonfile.readFile(file)
}

const setUsers = async (obj) => {
	try {
		await jsonfile.writeFile(file, obj)
		return true
	} catch (error) {
		console.log("Error writing users file:", error)
		return false
	}
}

module.exports = { getUsers, setUsers }
