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