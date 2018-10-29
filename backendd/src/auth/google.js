import passport from 'passport'
import jwt from 'jsonwebtoken'
import { prop, head } from 'ramda'

import UserDB from '../user/db'
import SECRET from '../user/secret'

const GoogleStrategy = require('passport-google-oauth20').Strategy

const googleOauth = process.env.NODE_ENV === 'production'
  ? {
    id: '499609547211-fj1kbsb8dkirm4cu4usp2uub1tmm28sg.apps.googleusercontent.com',
    secret: 'gpvZ59rrUzjQLEfGUx1vucZV',
    callback: 'https://api.unwel.ch/auth/google/callback',
    redirect: 'https://unwel.ch'
  }
  : {
    id: '499609547211-7hoc4pqvjtu5enpei98dt0b2kj4kbkve.apps.googleusercontent.com',
    secret: 'fh__6vJW3QYfoyLdyF_rf0LV',
    callback: 'http://localhost:3000/auth/google/callback',
    redirect: 'http://localhost:9000'
  }

export default app => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleOauth.id,
        clientSecret: googleOauth.secret,
        callbackURL: googleOauth.callback
      },
      function (accessToken, refreshToken, profile, cb) {
        const id = profile.id

        const photos = prop('photos', profile)
        const avatar = (photos ? prop('value', head(photos)) : null) || null
        const name = prop('displayName', profile)

        const user = {
          googleId: id,
          name,
          avatar
        }

        return cb(null, user)
      }
    )
  )

  app.get('/auth/google', function (req, res) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: req.query.token
    })(req, res)
  })

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async function (req, res) {
      const userData = req.user

      const oldToken = req.query.state

      let user
      if (oldToken) {
        // Existing anonymous user trying to save account
        const decodedToken = jwt.verify(oldToken, SECRET)
        user = await UserDB.get(decodedToken.userId)
        user.googleId = userData.googleId
        user.avatar = userData.avatar

        // TODO this will fail if the google account is already asociated with another unwelch account
        user = await UserDB.update(user)
      } else {
        user = await UserDB.getBy.googleId(userData.googleId)

        if (!user) {
          // New user creating saved account from the start
          user = await UserDB.insert({
            ...userData
          })
        }
      }

      const token = jwt.sign(
        { userId: user.id, logged_at: Math.floor(Date.now() / 1000) },
        SECRET
      )

      res.redirect(googleOauth.redirect + '?token=' + token)
    }
  )
}
