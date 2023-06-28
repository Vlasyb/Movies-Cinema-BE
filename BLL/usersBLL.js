const User = require("../models/userModel")
const usersFile = require("../DAL/usersFile")
const usersPermissionsFile = require("../DAL/usersPermissionsFile")

//maybe need to add signToken inside
const createUser = async (obj) => {
	const username = obj.username
	// let user = await User.findOne({ username })
	let user = await User.findOne({ username: new RegExp(`^${username}$`, "i") })

	if (user) {
		return "An account is already registered with the username provided."
	}
	user = new User(obj)
	console.log(user)
	await user.save()
	const userId = user._id.toString()

	const newPermissionsObj = {
		id: userId,
		permissions: [],
	}
	const newUserObj = {
		id: userId,
		firstName: "",
		lastName: "",
		createdDate: todaysDateAsString(),
		sessionTimeOut: 0, //0 means not set
	}

	// Retrieve the existing actions from the JSON file and add the new action
	const permissionsFileObject = await usersPermissionsFile.getPermissions()
	const usersFileObject = await usersFile.getUsers()
	permissionsFileObject.users.push(newPermissionsObj)
	usersFileObject.users.push(newUserObj)
	// Update the actions in the JSON file
	await usersFile.setUsers(usersFileObject)
	await usersPermissionsFile.setPermissions(permissionsFileObject)

	return "Created"
}

const todaysDateAsString = () => {
	const today = new Date()
	const day = today.getDate().toString().padStart(2, "0")
	const month = (today.getMonth() + 1).toString().padStart(2, "0") // Months are zero-based
	const year = today.getFullYear().toString()
	const formattedDate = `${day}/${month}/${year}`
	return formattedDate
}

module.exports = {
	createUser,
}
