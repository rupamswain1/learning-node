import express from 'express'
import helmet from 'helmet'
import path from 'path'
const app = express()

app.use(helmet())

app.get('/auth/google', (req, res) => {})

app.get('/auth/google/callback', (req, res) => {})

app.get('/auth/logout', (req, res) => {
  res.send('Logout')
})

app.get('/secret', (req, res) => {
  res.status(200).send('Your Secret is LOL!!!')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
