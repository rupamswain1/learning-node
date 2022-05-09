import express from 'express'
import cors from 'cors'
import getPlanetRouter from './routes/planets/planets.route'

const app = express()
app.use(cors())
app.use(express.json())
app.use(getPlanetRouter)

export default app
