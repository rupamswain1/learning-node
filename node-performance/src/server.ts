import http from 'http'
//Importing node cluster module
import cluster from 'cluster'
// import os from 'os'
import app from './app'

const PORT = process.env.PORT || 8000

const server = http.createServer(app)
const startServer = async () => {
  console.log('initializing server ')
  server.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`)
  })
}
if (cluster.isPrimary) {
  console.log('Primary thread')
  //fork the server
  // const NUMBER_WORKERS = os.cpus().length
  // for (let i = 0; i < NUMBER_WORKERS; i++) {
  //   cluster.fork()
  // }
} else {
  console.log('this is the worker thread')
  startServer()
}
