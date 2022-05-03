const express = require('express')
const app = express()

const { petRouter } = require('./router/pets.route')

//middleware

app.use((req, res, next) => {
  console.log('Middleware is called')
  next()
  console.log('after next statement of middleware called')
})

app.use(express.json())
//Router
app.use('/pets', petRouter)

app.listen(3000, () => {
  console.log('listing on port 3000')
})
