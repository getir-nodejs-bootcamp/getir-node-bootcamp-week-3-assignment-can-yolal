const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

let users = [
  {
    username: "test",
    password: "test"
  },
  {
    username: "admin",
    password: "admin"
  }
]

loginRouter.post('/', async (request, response) => {

  const body = request.body

  if (!body.username) return response.status(404).json({ error: "Username should be entered" })
  if (!body.password) return response.status(404).json({ error: "Password should be entered" })

  const foundUser = await users.find(user => user.username === body.username)

  if (!foundUser) {

    return response.status(404).json({ error: "User does not exist!" })
  } else {
    if (foundUser.password !== body.password) {
      return response.status(404).json({ error: "Password incorrect!" })
    } else {
      const token = jwt.sign(foundUser, process.env.SECRET, { expiresIn: 60 * 60 })
      response.status(200).send({ token, username: foundUser.username })
    }
  }
})

module.exports = loginRouter