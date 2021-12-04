const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "invalid URL" })
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = { unknownEndpoint, tokenExtractor }