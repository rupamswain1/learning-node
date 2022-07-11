import { parse } from 'csv-parse'
import fs from 'fs'
import path from 'path'

import Planets from './planets.mongo'

type Planets = {
  name: string
}

export const planets: string[] = []

const isHabitable = (planet: string): boolean => {
  return (
    planet['koi_disposition' as keyof string] === 'CONFIRMED' &&
    planet['koi_insol' as keyof string] > 0.36 &&
    planet['koi_insol' as keyof string] < 1.11 &&
    planet['koi_prad' as keyof string] < 1.6
  )
}

export const loadPlanets = () => {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', './data/kepler_data.csv'),
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        }),
      )
      .on('data', async (data) => {
        if (isHabitable(data)) {
          await savePlanets(data.kepler_name)
        }
      })
      .on('error', (err) => {
        console.log(err)
        reject()
      })
      .on('end', async () => {
        const planetNum = (await getHabitablePlanets()).length

        console.log(`found ${planetNum} habtable planets`)
        resolve()
      })
  })
}

export const savePlanets = async (planetName: String): Promise<void> => {
  try {
    await Planets.updateOne(
      {
        planetName: planetName,
      },
      {
        planetName: planetName,
      },
      {
        upsert: true,
      },
    )
  } catch (err) {
    throw new Error(`unable to save planet ${err}`)
  }
}

export const getHabitablePlanets = async () => {
  const allplanets = await Planets.find({}, { _id: 0, __v: 0 })
  return allplanets
}

export const getPlanetByName = async (planetName: String) => {
  return await Planets.findOne({ planetName: planetName })
}
