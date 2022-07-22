import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'

import https from 'https'
// import http from 'http'

import app from './app'
import { mongoConnect } from './services/mongoDB'
import { loadPlanets } from './models/planets.model'
import { loadLaunchData } from './models/launches.model'

const PORT = process.env.PORT || 8000

const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
  app,
)

const startServer = async () => {
  await mongoConnect()
  await loadPlanets()
  await loadLaunchData()
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
startServer()
