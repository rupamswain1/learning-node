import express from 'express'
import getPlanetRouter from './routes/planets/planets.route'

const app = express()

app.use(express.json())
app.use(getPlanetRouter)

export default app
