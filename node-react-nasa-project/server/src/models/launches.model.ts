import axios from 'axios'
import Launches from './launches.mongo'
import { getPlanetByName } from './planets.model'
type launchInterface = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date
  destination?: string
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
  // const planet = await getPlanetByName(launch.destination)
  // if (!planet) {
  //   throw new Error('planet not found')
  // }
  await Launches.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  })
}
// saveLaunch(launches[0])

export const getAllLaunches = async () => {
  return await Launches.find({}, { __v: 0, _id: 0 })
}

export const getLaunchByfilter = async (filter: any) => {
  return await Launches.find(filter, { _id: 0, __v: 0 })
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

export const getLatestflightNumber = async (): Promise<number> => {
  const latestRecord = await Launches.find().sort('-flightNumber')

  if (latestRecord.length === 0) {
    return DEFAULT_FLIGHT_number
  } else {
    return latestRecord[0].flightNumber
  }
}

const SPACEX_URL = 'https://api.spacexdata.com/v5/launches/query'
const loadSpaceXdata = async () => {
  const response = await axios.post(SPACEX_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  })
  if (response.status !== 200) {
    console.log('SpaceX data fetching failed')
    throw new Error('SpaceX data fetching failed')
  }
  const launches = response.data.docs
  for (const spacexLaunch of launches) {
    const payloads = spacexLaunch.payloads

    const customers = payloads.flatMap(
      (payload: { customers: string[]; id: string }[]) => {
        return (payload as { [key: string]: any })['customers'] as string
        //payload['customers']
      },
    )

    const launch = {
      flightNumber: spacexLaunch.flight_number,
      mission: spacexLaunch.name,
      rocket: spacexLaunch.rocket.name,
      launchDate: spacexLaunch.date_local,
      upcoming: spacexLaunch.upcoming,
      success: spacexLaunch.success,
      customer: customers,
    }

    await saveLaunch(launch)
  }
}

export const loadLaunchData = async (): Promise<void> => {
  const existingLaunch = await getLaunchByfilter({
    rocket: 'Falcon 1',
    flightNumber: 1,
    launchData: '2006-03-25T10:30:00+12:00',
  })

  if (existingLaunch.length > 0) {
    console.log('Launch Exists')
  } else {
    console.log('Downloading launch data')
    await loadSpaceXdata()
  }
}
