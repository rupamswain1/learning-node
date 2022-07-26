require('dotenv').config()

import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth2'
import path from 'path'

const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID || '',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '',
}
// const AUTH_OPTIONS = {
//   callbackURL: '/auth/google/callback',

//   clientSecret: CONFIG.CLIENT_SECRET,
//   clientID: CONFIG.CLIENT_ID,
// }

const AUTH_OPTIONS = {
  clientID: CONFIG.CLIENT_ID,
  clientSecret: CONFIG.CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}
const VerifyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback,
) => {
  console.log('Google profile', profile)
  done(null, profile)
}
passport.use(new Strategy(AUTH_OPTIONS, VerifyCallback))

const app = express()

app.use(helmet())
app.use(passport.initialize())

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email'],
  }),
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/faliure',
    successRedirect: '/',
    session: false,
  }),
  (req, res) => {
    console.log('google called back')
  },
)

app.get('/auth/logout', (req, res) => {
  res.send('Logout')
})

app.get('/secret', (req, res) => {
  res.status(200).send('Your Secret is LOL!!!')
})

app.get('/falure', (req, res) => {
  return res.send('Failed to login')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export default app
