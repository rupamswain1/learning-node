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
]

export const getAllLaunches = () => {
  return launches
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
