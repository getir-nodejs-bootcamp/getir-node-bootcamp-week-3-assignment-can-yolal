const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config()
const loginRouter = require('./Routes/login.js')
const musicianRouter = require('./Routes/musicians.js')
const middleware = require('./utils/middleware.js')
const requestLogger = require('./utils/requestLogger.js')

const PORT = 3000

app.use(middleware.tokenExtractor)

app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/musicians', musicianRouter)

app.use(middleware.unknownEndpoint)

app.listen(PORT, () => {
  requestLogger.startLog()
  console.log("Server is up")
})