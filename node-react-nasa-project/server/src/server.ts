import http from 'http'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import app from './app'
import { loadPlanets } from './models/planets.model'

dotenv.config()

const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.mongo_url || 'dummy url'

mongoose.connection.once('open', () => {
  console.log('MongoDB connection Eshtablished')
})

mongoose.connection.on('error', () => {
  console.log('mongoDB connection failed')
})

const server = http.createServer(app)

const startServer = async () => {
  await mongoose.connect(MONGO_URL)
  await loadPlanets()
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
startServer()
