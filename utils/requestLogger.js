const fs = require('fs')

const writeLog = (request, response) => {
  const reqtime = new Date().toString()

  const requestLog = `
  --Request Time: ${reqtime}
  --Method: ${request.method}
  --URL: ${request.url}
  --Body: ${request.body}
  --Response: ${response.statusCode}
  ------------`

  fs.appendFile('Log.txt', requestLog, (err) => {
    if (err) throw err
  })
}

const startLog = () => {
  const startTime = new Date()
  const sessionStart = `
***
 - NEW SERVER SESSION STARTED - ${startTime} -
***
`

  fs.appendFile('Log.txt', sessionStart, (err) => {
    if (err) throw err
  })
}

module.exports = { writeLog, startLog }