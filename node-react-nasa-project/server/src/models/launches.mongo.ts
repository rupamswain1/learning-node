import { Schema, model } from 'mongoose'

interface launchInterface {
  flightNumber: Number
  mission: string
  rocket: string
  launchDate: Date
  destination: string
  customer: string[]
  upcoming: boolean
  success: boolean
}

const LaunchSchema = new Schema<launchInterface>({
  flightNumber: {
    required: true,
    type: Number,
    min: 100,
    max: 999,
  },
  mission: {
    required: true,
    type: String,
  },
  rocket: {
    required: true,
    type: String,
  },
  launchDate: {
    required: true,
    type: Date,
  },
  destination: {
    required: true,
    type: String,
  },
  customer: [String],
  upcoming: {
    required: true,
    type: Boolean,
  },
  success: {
    required: true,
    type: Boolean,
    default: true,
  },
})

const Launches = model<launchInterface>('Launch', LaunchSchema)
export default Launches
