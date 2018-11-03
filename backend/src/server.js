import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import graphqlHTTP from 'express-graphql'
import passport from 'passport'

import * as db from './db'
import myGraphQLSchema from './schema'
import { getUser } from './user'
import {
  googleAuthMiddleware,
  googleAuthCallbackMiddleware,
  googleStrategy
} from './auth/google'
import { pushSubscribeMiddleware } from './push'
import anonymousAuthMiddleware from './auth/test-login'

require('dotenv').config()

console.log(
  `Connecting to db: ${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}`
)

// Force crash on unhandled rejections instead of silently ignoring them.
// In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

db.init({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: 'unwelch',
  port: process.env.DB_PORT
})

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(googleStrategy)

app.get('/auth/google', googleAuthMiddleware)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleAuthCallbackMiddleware
)
app.post('/auth/anonymous', anonymousAuthMiddleware)
app.post('/push-subscribe', pushSubscribeMiddleware)

app.use(
  '/graphql',
  graphqlHTTP(async request => {
    const user = await getUser(request)
    return {
      schema: myGraphQLSchema,
      context: { user },
      graphiql: true
    }
  })
)

app.get('/check-token', async function (req, res) {
  const user = await getUser(req)
  if (!user) {
    res.status(400)
    res.send()
    return
  }

  res.send()
})

console.log('Starting server...')
app.listen(3000)
