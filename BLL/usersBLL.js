const User = require("../models/userModel")
const usersFile = require("../DAL/usersFile")
const usersPermissionsFile = require("../DAL/usersPermissionsFile")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcrypt")

const login = async (req, res) => {
	//after user is authenticated
	const user = req.body.user
	let expiresIn = "2h" //admin gets 2h
	if (!user.isAdmin) {
		expiresIn = user.sessionTimeOut ? `${user.sessionTimeOut}m` : "0m" // Default expiration is 0 minutes
	}
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: expiresIn,
	})
	let maxAge = 120 * 60000 //admin gets 2h
	let message = "Successfully logged in as admin"
	if (!user.isAdmin) {
		maxAge = user.sessionTimeOut ? user.sessionTimeOut * 60000 : 0 //milliseconds , 1 min = 60000 milisecs
		message = "successfully logged in"
	}
	res.cookie("token", accessToken, {
		maxAge: maxAge,
		httpOnly: true,
	})
	res.status(200).json({
		message: message,
		accessToken: accessToken,
		user,
	})
}

const sendUserDetails = async (req, res) => {
	try {
		const userId = req.user.id
		let user = {}
		if (req.user.username != "admin") {
			user = await getUserById(userId)
		} else {
			user = await User.findOne({ _id: userId })
		}
		res.status(200).send(user)
	} catch (error) {
		console.error(error)
		res.status(500).send(error.message)
	}
}

const logout = async (req, res) => {
	res.cookie("token", "none", {
		maxAge: 0,
		httpOnly: true,
	}),
		res.status(200).json({ message: "User logged out successfully" })
}

const createExistingUser = async (obj) => {
	let user = await User.findOne({
		username: new RegExp(`^${obj.username}$`, "i"),
	}).select("+password")
	if (obj.username === "" || obj.username == null) {
		return "Username is a required field"
	}
	if (obj.password === "" || obj.password == null) {
		return "must provide password"
	}
	if (!user) {
		return `No username matching ${obj.username} , ask admin for sign`
	}

	if (user.password) {
		return "Password already exists for this user"
	}

	const hashedPass = await bcrypt.hash(obj.password, 10)

	await User.findByIdAndUpdate(user.id, { password: hashedPass })
	return "Successfully set password"
}

const createUser = async (obj) => {
	const username = obj.username
	if (username === "" || username.length < 3) {
		return "Username is a required field, and needs to have at least 3 characters"
	}
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
	const user = await User.findOne({ username: obj.username })
	console.log("abbbbbbbbbbbbbbbbbbb : ", user)
	if (user) {
		return "This Username Already Exists"
	}
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
				createdDate: user.createdDate,
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
			id: user._id,
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

const deleteUser = async (id) => {
	await User.findByIdAndDelete(id)

	//find and delete one
	const usersFileObj = await usersFile.getUsers()
	const usersPermissionsFileObj = await usersPermissionsFile.getPermissions()

	const updatedUsersFileObj = usersFileObj.users.reduce((acc, user) => {
		if (user.id !== id) {
			acc.push(user)
		}
		return acc
	}, [])
	const updatedUsersPermissionsFileObj = usersPermissionsFileObj.users.reduce(
		(acc, user) => {
			if (user.id !== id) {
				acc.push(user)
			}
			return acc
		},
		[]
	)
	//save
	await usersFile.setUsers({ users: updatedUsersFileObj })
	await usersPermissionsFile.setPermissions({
		users: updatedUsersPermissionsFileObj,
	})
	return "Deleted User"
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
	logout,
	login,
	createExistingUser,
	deleteUser,
	sendUserDetails,
	updateUser,
	getUserById,
	getAllUsers,
	createUser,
}
