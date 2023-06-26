const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const secret = process.env.ACCESS_TOKEN_SECRET
