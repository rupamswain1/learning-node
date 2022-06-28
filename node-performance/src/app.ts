import express from 'express'
import cluster from 'cluster'
const app = express()

function delay(timer: number) {
  const startTime = Date.now()
  while (Date.now() - startTime < timer) {}
}

app.get('/test', (req, res) => {
  res.send(`Performace Test completed on ${process.pid}`)
})

app.get('/timer', (req, res) => {
  delay(9000)
  res.send(`timer completed on ${process.pid}`)
})

export default app
