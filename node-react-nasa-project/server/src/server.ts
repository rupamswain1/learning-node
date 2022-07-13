import * as dotenv from 'dotenv'
dotenv.config()
import http from 'http'

import app from './app'
import { mongoConnect } from './services/mongoDB'
import { loadPlanets } from './models/planets.model'

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const startServer = async () => {
  await mongoConnect()
  await loadPlanets()
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
startServer()
