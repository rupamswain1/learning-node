require('dotenv').config()
import cookieSession from 'cookie-session'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth2'
import path from 'path'

const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID || '',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '',
  COOKIE_1: process.env.COOKIE_1 || '',
  COOKIE_2: process.env.COOKIE_2 || '',
}

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
//Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user)
})
//Read the session from the cookie
passport.deserializeUser((obj: any, done) => {
  done(null, obj)
})

const app = express()

app.use(helmet())

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [CONFIG.COOKIE_1, CONFIG.COOKIE_2],
  }),
)

app.use(passport.initialize())
app.use(passport.session())

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
    session: true,
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
