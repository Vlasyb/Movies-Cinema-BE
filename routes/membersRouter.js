const express = require("express")
const membersBLL = require("../BLL/membersBLL")
const userMiddleware = require("../middleware/userMiddleware")
const permsMiddleware = require("../middleware/permsMiddleware")

const router = express.Router()

router.get(
	"/",
	userMiddleware.verifyToken,
	permsMiddleware.viewSubsPerm,
	async (req, res) => {
		try {
			const { data: members } = await membersBLL.getAllMembers()
			res.status(200).json(members)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.get(
	"/member/:id",
	userMiddleware.verifyToken,
	permsMiddleware.viewSubsPerm,
	async (req, res) => {
		try {
			const { id } = req.params
			const { data: member } = await membersBLL.getMemberById(id)
			res.status(200).json(member)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.post(
	"/",
	userMiddleware.verifyToken,
	permsMiddleware.createSubsPerm,
	async (req, res) => {
		try {
			const obj = req.body
			const { data: result } = await membersBLL.addMember(obj)
			res.status(201).json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

router.put(
	"/:id",
	userMiddleware.verifyToken,
	permsMiddleware.editSubsPerm,
	async (req, res) => {
		try {
			const { id } = req.params
			const obj = req.body
			const { data: result } = await membersBLL.updateMember(id, obj)
			res.status(201).json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)
//delete member + his subscriptions
router.delete(
	"/:id",
	userMiddleware.verifyToken,
	permsMiddleware.deleteSubsPerm,
	async (req, res) => {
		try {
			const { id } = req.params
			const { data: result } = await membersBLL.deleteMember(id)
			res.json(result)
		} catch (error) {
			console.log("Error occurred in Cinema backend:", error)
			res.status(500).send("Internal Server Error")
		}
	}
)

module.exports = router
