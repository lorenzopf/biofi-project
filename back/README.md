### Run the api server

npx nodemon rs server.js

### Create the api database (if not already exist)

use bioFi-db
db.init.insert({"name":"creation"})

### Create new db user

db.createUser(  
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "readWrite", db: "bioFi-db" } ]
  }
)

### Connect to mongo for the api database

mongo -u admin -p admin --authenticationDatabase "bioFi-db"

# Routes

## Users routes

### Login route
     
### POST | /user/login
	{    
        email:String,
	    password:String,
	}

### GET | /users
### GET | /user/logout

### POST | /user/signup
	{
        pseudo:String,
        email:String,
        firstname:String,
        lastname:String,
		password:String
	}
	
### GET | /user/:id_user
### PUT | /user/edit
	{
        pseudo:String,
        email:String,
        firstname:String,
        lastname:String,
		password:String
	}
	
### GET | /user/:id_user/delete