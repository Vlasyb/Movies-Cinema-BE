//Backend server to manage cinema - uses Subscription WS + Users.json, Permissions.json + users DB
//Routers import

//npm requires
const cookieparser = require("cookie-parser")
const express = require("express")

const connectDB = require("./configs/DB")

const app = express()
const port = 8040
connectDB()

// app.use(cors({ origin: [`http://localhost:3000`], credentials: true }))
app.use(express.json())
app.use(cookieparser())

//Routers

//connection
app.listen(port, () => {
	console.log(`app is listening at http://localhost:${port}`)
})
