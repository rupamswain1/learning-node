const express = require('express')
const app = express()

const { getPets, getPetById } = require('./controllers/getPets.controller')
const { postPet } = require('./controllers/postPets.controller')

app.get('/pets', getPets)

//middleware

app.use((req, res, next) => {
  console.log('Middleware is called')
  next()
  console.log('after next statement of middleware called')
})

app.use(express.json())

app.get('/pets/:petId', getPetById)

app.post('/pets', postPet)

app.listen(3000, () => {
  console.log('listing on port 3000')
})
