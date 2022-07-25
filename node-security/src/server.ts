import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'

import https from 'https'

import app from './app'

const PORT = process.env.PORT || 8000

const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
  app,
)

const startServer = async () => {
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
startServer()
