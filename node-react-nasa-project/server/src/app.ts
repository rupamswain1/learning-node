import express from 'express'
import cors from 'cors'
import getPlanetRouter from './routes/planets/planets.route'
import { launchRouter } from './routes/launches/launches.route'
import path from 'path'
import morgan from 'morgan'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(getPlanetRouter)
app.use(launchRouter)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
