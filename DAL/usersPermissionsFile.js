const jsonfile = require("jsonfile")
const path = require("path")

const file = path.join(__dirname, "../data/permissions.json")

const getPermissions = () => {
	return jsonfile.readFile(file)
}

const setPermissions = async (obj) => {
	try {
		await jsonfile.writeFile(file, obj)
		return true
	} catch (error) {
		console.log("Error writing permissions file:", error)
		return false
	}
}

module.exports = { getPermissions, setPermissions }
