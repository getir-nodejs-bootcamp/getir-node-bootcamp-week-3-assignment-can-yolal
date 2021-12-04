const jwt = require('jsonwebtoken')
const musicianRouter = require('express').Router()
const requestLogger = require('../utils/requestLogger.js')

let localData = [
  {
    name: "Selami Şahin",
    country: "Turkey",
    genre: "arabesque",
    id: 1
  },
  {
    name: "36 Boyz",
    country: "Germany",
    genre: "rap",
    id: 2
  },
  {
    name: "Ferdi Özbeğen",
    country: "Turkey",
    genre: "pianist",
    id: 3
  },
  {
    name: "Muazzez Abacı",
    country: "Turkey",
    genre: "arabesque",
    id: 4
  },
  {
    name: "Tame Impala",
    country: "Australia",
    genre: "psychedelic",
    id: 5
  },
  {
    name: "Erkin Koray",
    country: "Turkey",
    genre: "anatolian rock",
    id: 6
  }
]

const idGenerator = () => {
  const newId = localData.length + 1
  return newId
}

musicianRouter.get("/", (request, response) => {
  requestLogger.writeLog(request, response)
  response.status(200).json({ message: "Welcome to Music Database" })
})

musicianRouter.get("/all", (request, response) => {
  requestLogger.writeLog(request, response)
  response.status(200).json(localData)
})

musicianRouter.post("/", (request, response) => {
  requestLogger.writeLog(request, response)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const body = request.body

  if (!body.name) return response.status(404).json({ error: "Name should be entered" })
  if (!body.country) return response.status(404).json({ error: "Country should be entered" })
  if (!body.genre) return response.status(404).json({ error: "Genre should be entered" })

  const newMusician = {
    name: request.body.name,
    country: request.body.country,
    genre: request.body.genre,
    id: idGenerator()
  }

  localData.push(newMusician)
  response.status(201).json(newMusician)
})

musicianRouter.get("/:id", async (request, response) => {
  requestLogger.writeLog(request, response)

  const requestId = parseInt(request.params.id)

  const foundUser = await localData.find((musician) => {
    if (musician.id === requestId) {
      return musician
    }
  })

  if (!foundUser) {
    return response.status(404).json({ error: "User not found!" })
  } else {
    return response.status(201).json(foundUser)
  }
})

musicianRouter.patch("/:id", async (request, response) => {
  requestLogger.writeLog(request, response)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const body = request.body

  const requestId = parseInt(request.params.id)

  const foundUser = await localData.find((musician) => {
    if (musician.id === requestId) {
      return musician
    }
  })

  if (!foundUser) {
    return response.status(404).json({ error: "User not found!" })
  } else {
    const requestKeys = Object.keys(body)
    for (let key of requestKeys) {
      foundUser[key] = body[key]
    }
    localData.requestId = foundUser
    return response.status(201).json(localData)
  }

})

musicianRouter.put("/:id", async (request, response) => {
  requestLogger.writeLog(request, response)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const body = request.body

  if (!body.name) return response.status(404).json({ error: "Name should be entered" })
  if (!body.country) return response.status(404).json({ error: "Country should be entered" })
  if (!body.genre) return response.status(404).json({ error: "Genre should be entered" })

  const requestId = parseInt(request.params.id)

  const foundUser = await localData.find((musician) => {
    if (musician.id === requestId) {
      return musician
    }
  })

  if (!foundUser) {
    return response.status(404).json({ error: "User not found!" })
  } else {
    const requestKeys = Object.keys(body)
    for (let key of requestKeys) {
      foundUser[key] = body[key]
    }
    localData.requestId = foundUser
    return response.status(201).json(localData)
  }
})

musicianRouter.delete("/:id", async (request, response) => {
  requestLogger.writeLog(request, response)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const body = request.body

  const requestId = parseInt(request.params.id)

  const foundUser = await localData.find((musician) => {
    if (musician.id === requestId) {
      return musician
    }
  })

  if (!foundUser) {
    return response.status(404).json({ error: "User not found!" })
  } else {
    localData = localData.filter(data => data.id !== requestId)
    return response.status(201).json(localData)
  }
})

module.exports = musicianRouter