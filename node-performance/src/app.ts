import express from 'express'

const app = express()

function delay(timer: number) {
  const startTime = Date.now()
  while (Date.now() - startTime < timer) {}
}

app.get('/test', (req, res) => {
  res.send('Performace Test')
})

app.get('/timer', (req, res) => {
  delay(9000)
  res.send('timer completed')
})

export default app
