const express = require('express')
const app = express()

const path = require('path')

const { petRouter } = require('./router/pets.route')
const { fileRoute } = require('./router/file.route')

//middleware

app.use((req, res, next) => {
  console.log('Middleware is called')
  next()
  console.log('after next statement of middleware called')
})

app.use(express.json())
//Router
app.use('/pets', petRouter)

app.use('/getFile', fileRoute)

//serve static files
app.use('/index.html', express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
  console.log('listing on port 3000')
})
