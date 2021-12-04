# Assignment 3

This repo is a simple web server created with Express using local database and json web token

If you want to check this repo in your local, you should run "npm install" in terminal at project's directory

ENDPOINTS are listed below

* GET /api/musicians/
* GET /api/musicians/all
* GET /api/musicians/#id
* POST /api/musicians
* PUT /api/musicians/#id
* PATCH /api/musicians/#id
* DELETE /api/musicians/#id

Client requests will be stored in Log.txt file

In order to use post, put, delete, patch requests you should login first.

To login -> POST /api/login with json body {username: 'test', password: 'test'}.
After login API return you a token which will be required to use post/put/patch/delete

After login you can send your request as following:

POST http://localhost:3000/api/musicians/ \
content-type: application/json \
Authorization: bearer "your token"

{ \
  "name": "Ted", \
  "genre" : "Dance", \
  "country" : "USA" \
}

# #

There are two routers:
* /api/musicians
* /api/login

Musicians api is a gateway to our local database where endpoints and related requests are defined
Login api is used to get a token for post/put/patch/delete operations in musicians gateway.

APIs are designed to use json for I/O.

# #

In utils folder, middleware and requestogger modules are defined.

Unknown endpoints are handled in middleware and added to express in index.js. \
For token extraction, tokenExtractor function is also defined in middleware file and it is a helper function for our request handlings.

Requestlogger logs client requests to a folder in project's directory.

# #
For authorization jsonwebtoken module is used.