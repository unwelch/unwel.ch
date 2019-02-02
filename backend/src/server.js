import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import graphqlHTTP from 'express-graphql'
import passport from 'passport'
import {
  captureException as sentryCaptureException,
  init as sentryInit,
  Handlers as sentryHandlers
} from '@sentry/node'

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

if (process.env.NODE_ENV === 'production') {
  sentryInit({
    dsn: process.env.SENTRY_DSN
  })
}

console.log(
  `Connecting to db: ${process.env.DB_USER}@${process.env.DB_HOST}:${
    process.env.DB_PORT
  }`
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
if (process.env.NODE_ENV === 'production') {
  app.use(sentryHandlers.requestHandler()) // The request handler must be the first middleware on the app
}
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
      graphiql: true,
      formatError: error => {
        if (process.env.NODE_ENV === 'production') {
          sentryCaptureException(error)
        }
        return {
          message: error.message,
          locations: error.locations,
          path: error.path
        }
      }
    }
  })
)

app.get('/check-token', async function(req, res) {
  const user = await getUser(req)
  if (!user) {
    res.status(400)
    res.send()
    return
  }

  res.send()
})

if (process.env.NODE_ENV === 'production') {
  // The error handler must be before any other error middleware
  app.use(sentryHandlers.errorHandler())
}

console.log('Starting server...')
app.listen(3000)
