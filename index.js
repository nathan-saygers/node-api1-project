// implement your API here
const express = require('express');
const Users = require('./data/db.js');
const server = express();
server.use(express.json());

// GET request
server.get('/api/users', (request, response) => {
  Users.find()
    .then(users => {
      response.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
})

// GET specific user by ID
server.get('/api/users/:id', (request, response) => {
  const id = request.params.id
  Users.findById(id)
    .then(user => {
      console.log(user.id)
      response.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      response.status(404).json({message: "The user with the specified ID does not exist."})
    })
})

// POST new user ID
server.post('/api/users', (request, response) => {
  const userData = request.body;
  if(userData.name && userData.bio){
  Users.insert(userData)
    .then(user => {
      response.status(201).send(userData);
    })
    .catch(error => {
      console.log(error);
      // error handling
      res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    })} else {
      response.status(400).send({ errorMessage: "Please provide name and bio for the user."})
    }
})

// DELETE user by ID
server.delete('/api/users/:id', (request, response) => {
  const id = request.params.id;
  console.log(id)
  Users.remove(id)
    .then(user => {
      if(user !== 0) {
        response.status(204).send({message: `user id: ${id} has been deleted`});
      } else {
        response.status(404).send({message: "The user with the specified ID does not exist."})}
    })
    .catch(error => {
      console.log(error)
      response.status(500).json
      ({errorMessage: "The user could not be removed"})
    })
})

// PUT request by ID
server.put('/api/users/:id', (request, response) => {
  const id = request.params.id;
  const userData = request.body;
  if(userData.name && userData.bio) {
    Users.update(id, userData)
      .then(user => {
        if(user !== 0) {
          response.status(201).json(userData);
        } else {
          response.status(400).send({ errorMessage: "The user with the specified ID does not exist."})
        }
      })
      .catch(error => {
        console.log(error)
        response.status(500).json
        ({errorMessage: "The user information could not be modified."})
      })
  } else {
    response.status(400).send({ errorMessage: "Please provide name and bio for the user."})
  }
})



const port = 8000
server.listen(port, ()=> console.log(`now listening on port ${port}`));