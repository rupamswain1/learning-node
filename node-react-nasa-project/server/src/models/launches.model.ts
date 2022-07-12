import Launches from './launches.mongo'
import { getPlanetByName } from './planets.model'
type launchInterface = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date
  destination: string
  customer: string[]
  upcoming: boolean
  success: boolean
}
const DEFAULT_FLIGHT_number = 100
let latestflightNumber = 100
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

export const scheduleNewLaunch = async (launch: any): Promise<void> => {
  const flightNum = await getLatestflightNumber()
  await saveLaunch({
    ...launch,
    success: true,
    upcoming: true,
    customer: ['Rupam'],
    flightNumber: flightNum + 1,
  })
}

// export const addNewLaunch = (launch: any): void => {
//   latestflightNumber++
//   const newLaunch: launchInterface = {
//     flightNumber: latestflightNumber,
//     success: true,
//     upcoming: true,
//     customer: ['Rupam Swain'],
//     ...launch,
//   }
//   launches.push(newLaunch
// }

export const getLaunchByflightNumber = async (flightNumber: number) => {
  return await Launches.find({ flightNumber: flightNumber }, { _id: 0, __v: 0 })
}

export const abortLaunch = async (flightNumber: number): Promise<boolean> => {
  const abortedLaunch = await Launches.updateOne(
    { flightNumber: flightNumber },
    {
      upcoming: false,
      success: false,
    },
  )

  return abortedLaunch.acknowledged && abortedLaunch.matchedCount > 0
}

export const getHistoricalLaunches = async (): Promise<launchInterface[]> => {
  const today = new Date()
  return await Launches.find(
    {
      $or: [
        { launchDate: { $lt: today } },
        { upcoming: false },
        { success: false },
      ],
    },
    { __v: 0, _id: 0 },
  )
}

export const getUpcomingLaunches = async (): Promise<launchInterface[]> => {
  const today = new Date()

  return await Launches.find(
    {
      $and: [
        { upcoming: true },
        { success: true },
        { launchDate: { $gte: today } },
      ],
    },
    { _id: 0, __v: 0 },
  )
}

export const getLatestflightNumber = async () => {
  const latestRecord = await Launches.find().sort('-flightNumber')

  if (!latestRecord) {
    return DEFAULT_FLIGHT_number
  } else {
    return latestRecord[0].flightNumber
  }
}
