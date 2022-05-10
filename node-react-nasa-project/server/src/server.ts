import http from 'http'
import app from './app'
import { loadPlanets } from './models/planets.model'
const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const startServer = async () => {
  await loadPlanets()
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
startServer()
