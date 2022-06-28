import http from 'http'
import app from './app'

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const startServer = async () => {
  console.log('initializing server ')
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
startServer()
