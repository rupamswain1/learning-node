import { Schema, model } from 'mongoose'

interface planetInterface {
  planetName: String
}

const PlanetSchema = new Schema<planetInterface>({
  planetName: {
    required: true,
    type: String,
  },
})

const Planets = model<planetInterface>('Planet', PlanetSchema)
export default Planets
