import { parse } from 'csv-parse'
import fs from 'fs'
import path from 'path'

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
      .on('data', (data) => {
        if (isHabitable(data)) {
          planets.push(data.kepler_name)
        }
      })
      .on('error', (err) => {
        console.log(err)
        reject()
      })
      .on('end', () => {
        resolve()
      })
  })
}
