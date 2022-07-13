import request from 'supertest'

import app from '../../app'
import { mongoConnect, mongoDisconnect } from '../../services/mongoDB'
const launches = [
  {
    flightNumber: 101,
    mission: 'mangal',
    rocket: 'mangal yaan',
    launchDate: '2015-03-25T00:00:00.000Z',
    destination: 'Kepler-1652 b',
    customer: ['Rupam'],
    upcoming: true,
    success: true,
  },
  {
    flightNumber: 102,
    mission: 'Moon',
    rocket: 'chandra yaan',
    launchDate: '2030-03-25T00:00:00.000Z',
    destination: 'Kepler-296 A f',
    customer: ['Rupam'],
    upcoming: true,
    success: true,
  },
]

describe('test Launch API', () => {
  beforeAll(async () => {
    await mongoConnect()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  const addLaunch = {
    mission: 'mangal',
    rocket: 'mangal yaan',
    launchDate: '2015-03-25T00:00:00.000Z',
    destination: 'Kepler-1652 b',
  }
  const addLaunch2 = {
    mission: 'Moon',
    rocket: 'chandra yaan',
    launchDate: '2030-03-25T00:00:00.000Z',
    destination: 'Kepler-296 A f',
  }
  describe('test POST /launches', () => {
    test('it should test 201 status for /launches', async () => {
      const response = await request(app).post('/launches').send(addLaunch)
      expect(response.statusCode).toBe(201)
    })

    test('it should test 400 status for /launches, when body is blank', async () => {
      const response = await request(app).post('/launches')
      expect(response.statusCode).toBe(400)
    })

    test('it should give invalid date message when the date is provided incorrectly', async () => {
      const response = await request(app)
        .post('/launches')
        .send({
          mission: 'moon',
          rocket: 'chandra yaan',
          launchDate: '2023-05-251',
          destination: 'Kepler-1652 b',
          customer: ['ISRO'],
        })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({ error: 'invalid launch date' })
    })

    test('it should give invalid error when any of the required property is missing', async () => {
      const response = await request(app)
        .post('/launches')
        .send({
          missions: 'moon',
          rocket: 'chandra yaan',
          launchDate: '2023-05-251',
          destination: 'Kepler-1652 b',
          customer: ['ISRO'],
        })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({ error: 'invalid launch property' })
    })

    test('it should add the data for correct set of data in /launches', async () => {
      const response = await request(app).post('/launches').send(addLaunch2)

      expect(response.statusCode).toBe(201)
      expect(response.body[1]).toMatchObject({
        flightNumber: 102,
        success: true,
        upcoming: true,
        mission: 'Moon',
        rocket: 'chandra yaan',
        launchDate: '2030-03-25T00:00:00.000Z',
        destination: 'Kepler-296 A f',
        customer: ['Rupam'],
      })
    })
  })
  const invalidDateLaunch = {
    mission: 'moon',
    rocket: 'chandra yaan',
    launchDate: '2023-05-251',
    destination: 'Kepler-1652 b',
    customer: ['ISRO'],
  }
  const incompleteData = {
    mission: 'moon',
    rocket: 'chandra yaan',
    launchDate: '2023-05-25',
    // destination: 'Moon',
    customer: ['ISRO'],
  }

  describe('test GET /launches', () => {
    test('it should test 200 status for /launches launch', async () => {
      const response = await request(app).get('/launches')

      expect(response.statusCode).toBe(200)
    })

    test('it should validate body of response for /launches', async () => {
      const response = await request(app).get('/launches')
      expect(response.body).toMatchObject(launches)
    })

    test('it should test 200 status for /launches/upcoming launch', async () => {
      const response = await request(app).get('/launches/upcoming')
      expect(response.statusCode).toBe(200)
    })

    test('it should validate body of response for /launches/upcoming', async () => {
      const response = await request(app).get('/launches/upcoming')
      expect(response.body[0]).toMatchObject(launches[1])
    })

    test('it should test 200 status for /launches/history launch', async () => {
      const response = await request(app).get('/launches/history')
      expect(response.statusCode).toBe(200)
    })
    test('it should validate body of response for /launches/history', async () => {
      const response = await request(app).get('/launches/history')
      expect(response.body[0]).toMatchObject(launches[0])
    })
  })

  describe('test errors from POST launches', () => {
    test('it should catch the invalid date error', async () => {
      const response = await request(app)
        .post('/launches')
        .send(invalidDateLaunch)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toStrictEqual({
        error: 'invalid launch date',
      })
    })

    test('it should catch the missing required attribute error', async () => {
      const response = await request(app)
        .post('/launches')
        .send(incompleteData)
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body).toStrictEqual({
        error: 'invalid launch property',
        launch: incompleteData,
      })
    })
  })
})
