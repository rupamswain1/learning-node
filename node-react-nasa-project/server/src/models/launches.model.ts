import Launches from './launches.mongo'
import { getPlanetByName } from './planets.model'
type launchInterface = {
  flightNumber: Number
  mission: string
  rocket: string
  launchDate: Date
  destination: string
  customer: string[]
  upcoming: boolean
  success: boolean
}
const DEFAULT_FLIGHT_NUMBER = 100
let latestFlightNumber = 100
export const launches: launchInterface[] = [
  {
    flightNumber: 1,
    mission: 'mangal',
    rocket: 'mangal yaan',
    launchDate: new Date('2015-03-25'),
    destination: 'Mars',
    customer: ['Bhartiya', 'Elon'],
    upcoming: true,
    success: true,
  },
  {
    flightNumber: 2,
    mission: 'Moon',
    rocket: 'chandra yaan',
    launchDate: new Date('2030-03-25'),
    destination: 'Moon',
    customer: ['Elon'],
    upcoming: true,
    success: true,
  },
]

export const saveLaunch = async (launch: launchInterface) => {
  const planet = await getPlanetByName(launch.destination)
  if (!planet) {
    throw new Error('planet not found')
  }
  await Launches.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  })
}
// saveLaunch(launches[0])

export const getAllLaunches = async () => {
  return await Launches.find({}, { __v: 0, _id: 0 })
}

export const addNewLaunch = (launch: any): void => {
  latestFlightNumber++
  const newLaunch: launchInterface = {
    flightNumber: latestFlightNumber,
    success: true,
    upcoming: true,
    customer: ['Rupam Swain'],
    ...launch,
  }
  launches.push(newLaunch)
}

export const getLaunchByFlightNumber = (flightNumber: Number) => {
  return launches.filter((launch) => launch.flightNumber === flightNumber)
}

export const abortLaunch = (flightNumber: Number) => {
  return launches.filter((launch) => {
    if (launch.flightNumber === flightNumber) {
      launch.upcoming = false
      launch.success = false
      return launch
    }
  })
}

export const getHistoricalLaunches = (): launchInterface[] => {
  const today = new Date()
  return launches.filter(
    (launch) =>
      today > new Date(launch.launchDate) || launch.upcoming === false,
  )
}

export const getUpcomingLaunches = (): launchInterface[] => {
  const today = new Date()
  return launches.filter(
    (launch) =>
      today <= new Date(launch.launchDate) && launch.upcoming !== false,
  )
}

export const getLatestFlightNumber = async () => {
  const latestRecord = await Launches.find().sort('-flightNumber')

  if (!latestRecord) {
    return DEFAULT_FLIGHT_NUMBER
  } else {
    return latestRecord[0].flightNumber
  }
}
getLatestFlightNumber().then((d) => console.log(d))
