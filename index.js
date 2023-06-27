//Backend server to manage cinema - uses Subscription WS + Users.json, Permissions.json + users DB
//Routers import
const usersRouter = require("./routes/usersRouter")
const moviesRouter = require("./routes/moviesRouter")
const membersRouter = require("./routes/membersRouter")
const subscriptionsRouter = require("./routes/subscriptionsRouter")
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
app.use("/users", usersRouter)
app.use("/movies", moviesRouter)
app.use("/members", membersRouter)
app.use("/subscriptions", subscriptionsRouter)

//connection
app.listen(port, () => {
	console.log(`app is listening at http://localhost:${port}`)
})
