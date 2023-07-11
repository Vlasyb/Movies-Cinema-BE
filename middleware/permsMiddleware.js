const User = require("../models/userModel")
const usersBLL = require("../BLL/usersBLL")

const viewSubsPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if (
			(user.permissions ?? []).includes("view subscriptions") ||
			user.isAdmin
		) {
			next()
			return
		}
		return res
			.status(401)
			.json({ message: "No permission to view subscriptions" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}

const viewMoviesPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if ((user.permissions ?? []).includes("view movies") || user.isAdmin) {
			next()
			return
		}
		return res.status(401).json({ message: "No permission to view movies" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}

const createSubsPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if (
			(user.permissions ?? []).includes("create subscriptions") ||
			user.isAdmin
		) {
			next()
			return
		}
		return res
			.status(401)
			.json({ message: "No permission to create subscriptions" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}
const createMoviesPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if ((user.permissions ?? []).includes("create movies") || user.isAdmin) {
			next()
			return
		}
		return res.status(401).json({ message: "No permission to create movies" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}
const deleteSubsPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if (
			(user.permissions ?? []).includes("delete subscriptions") ||
			user.isAdmin
		) {
			next()
			return
		}
		return res
			.status(401)
			.json({ message: "No permission to delete subscriptions" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}
const deleteMoviesPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if ((user.permissions ?? []).includes("delete movies") || user.isAdmin) {
			next()
			return
		}
		return res.status(401).json({ message: "No permission to delete movies" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}
const editSubsPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if (
			(user.permissions ?? []).includes("edit subscriptions") ||
			user.isAdmin
		) {
			next()
			return
		}
		return res
			.status(401)
			.json({ message: "No permission to edit subscriptions" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}
const editMoviesPerm = async (req, res, next) => {
	const { user } = req
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		if ((user.permissions ?? []).includes("edit movies") || user.isAdmin) {
			next()
			return
		}
		return res.status(401).json({ message: "No permission to edit movies" })
	} catch (error) {
		console.log("error ", error)
		return res.status(500).send("Server error")
	}
}

module.exports = {
	viewSubsPerm,
	createSubsPerm,
	deleteSubsPerm,
	editSubsPerm,
	viewMoviesPerm,
	createMoviesPerm,
	deleteMoviesPerm,
	editMoviesPerm,
}
