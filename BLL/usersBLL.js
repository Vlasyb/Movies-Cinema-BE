const User = require("../models/userModel")
const usersFile = require("../DAL/usersFile")
const usersPermissionsFile = require("../DAL/usersPermissionsFile")
// require("dotenv").config()

//maybe need to add signToken inside
const createUser = async (obj) => {
	const username = obj.username
	if (username === "" || username.length < 3) {
		return "Username is a required field, and needs to have at least 3 characters"
	}
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
		permissions: obj.permissions ? obj.permissions : [],
	}
	const newUserObj = {
		id: userId,
		firstName: obj.firstName ? obj.firstName : "",
		lastName: obj.lastName ? obj.lastName : "",
		createdDate: todaysDateAsString(),
		sessionTimeOut: obj.sessionTimeOut ? obj.sessionTimeOut : 0, //0 means not set
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

//can also not do '?' then the field will be null
const getUserById = async (id) => {
	const userDB = await User.findOne({ _id: id })
	const usersFileObj = await usersFile.getUsers()
	const usersPermissionsFileObj = await usersPermissionsFile.getPermissions()

	const userFile = usersFileObj.users.filter((user) => user.id === userDB.id)[0]
	console.log(userFile)
	const userPermFile = usersPermissionsFileObj.users.filter(
		(user) => user.id === userDB.id
	)[0]

	const user = {
		id: userDB.id,
		username: userDB.username,
		firstName: userFile.firstName ? userFile.firstName : "",
		lastName: userFile.lastName ? userFile.lastName : "",
		sessionTimeOut: userFile.sessionTimeOut ? userFile.sessionTimeOut : 0,
		createdDate: userFile.createdDate,
		permissions: userPermFile.permissions ? userPermFile.permissions : [],
	}
	return user
}

const updateUser = async (id, obj) => {
	await User.findByIdAndUpdate(id, obj)

	//find and change
	const usersFileObj = await usersFile.getUsers()
	const usersPermissionsFileObj = await usersPermissionsFile.getPermissions()

	const updatedUsersFileObj = usersFileObj.users.map((user) => {
		if (user.id == id) {
			return {
				id: id,
				firstName: obj.firstName ? obj.firstName : user.firstName,
				lastName: obj.lastName ? obj.lastName : user.lastName,
				sessionTimeOut: obj.sessionTimeOut
					? obj.sessionTimeOut
					: user.sessionTimeOut,
			}
		} else {
			return user
		}
	})
	const updatedUsersPermissionsFileObj = usersPermissionsFileObj.users.map(
		(user) => {
			if (user.id == id) {
				return {
					id: id,
					permissions: obj.permissions ? obj.permissions : user.permissions,
				}
			} else {
				return user
			}
		}
	)
	// {
	// 	"id": "64a48da8817e9d481feaf15f",
	// 	"firstName": "Jera",
	// 	"lastName": "Abu",
	// 	"createdDate": "05/07/2023",
	// 	"sessionTimeOut": 10
	//   }

	//save
	await usersFile.setUsers({ users: updatedUsersFileObj })
	await usersPermissionsFile.setPermissions({
		users: updatedUsersPermissionsFileObj,
	})

	return "Updated"
}

const getAllUsers = async () => {
	const usersDB = await User.find({ isAdmin: false })
	const usersPermissionsObject = await usersPermissionsFile.getPermissions()
	const usersObject = await usersFile.getUsers()
	let usersResult = []
	usersResult = usersDB.map((user) => {
		const fileUser = usersObject.users.find((userfl) => user.id == userfl.id)
		const permissionsUser = usersPermissionsObject.users.find(
			(userfl) => user.id == userfl.id
		)

		const combinedUser = {
			username: user.username,
			firstName: fileUser.firstName,
			lastName: fileUser.lastName,
			sessionTimeOut: fileUser.sessionTimeOut,
			createdDate: fileUser.createdDate,
			permissions: permissionsUser,
		}
		return combinedUser
	})

	return usersResult
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
	updateUser,
	getUserById,
	getAllUsers,
	createUser,
}
