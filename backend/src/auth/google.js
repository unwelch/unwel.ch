import passport from 'passport'
import jwt from 'jsonwebtoken'
import { prop, head } from 'ramda'

import UserDB from '../user/db'
import SECRET from '../user/secret'

const GoogleStrategy = require('passport-google-oauth20').Strategy

const googleOauth =
  process.env.NODE_ENV === 'production'
    ? {
        id:
          '499609547211-vvd7hvs7jegnrk4kvd2vncm4ekld1ldn.apps.googleusercontent.com',
        secret: process.env.OAUTH_GOOGLE_SECRET,
        callback: 'https://api.unwel.ch/auth/google/callback',
        redirect: 'https://unwel.ch'
      }
    : {
        id:
          '499609547211-t00j4eum1isr2lv7d17otpimb0o4aaqu.apps.googleusercontent.com',
        secret: process.env.UNWELCH_OAUTH_DEV_GOOGLE_SECRET,
        callback: 'http://localhost:3000/auth/google/callback',
        redirect: 'http://localhost:9000'
      }

export const googleAuthCallbackMiddleware = async (req, res) => {
  const userData = req.user

  const oldToken = req.query.state

  let user
  if (oldToken) {
    // Existing anonymous user trying to save account
    const decodedToken = jwt.verify(oldToken, SECRET)
    user = await UserDB.get(decodedToken.userId)
    user.googleId = userData.googleId
    user.avatar = userData.avatar
    user.email = userData.email

    // TODO this will fail if the google account is already asociated with another unwelch account
    user = await UserDB.update(user)
  } else {
    const users = await UserDB.getBy('googleId', userData.googleId)
    if (users.length === 0) {
      // New user creating saved account from the start
      user = await UserDB.insert({
        ...userData
      })
    } else {
      user = users[0]
    }
  }

  const token = jwt.sign(
    { userId: user.id, logged_at: Math.floor(Date.now() / 1000) },
    SECRET
  )

  res.redirect(googleOauth.redirect + '?token=' + token)
}

export const googleAuthMiddleware = (req, res) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: req.query.token
  })(req, res)
}

export const googleStrategy = new GoogleStrategy(
  {
    clientID: googleOauth.id,
    clientSecret: googleOauth.secret,
    callbackURL: googleOauth.callback
  },
  (accessToken, refreshToken, profile, cb) => {
    const id = profile.id

    const photos = prop('photos', profile)
    const avatar = (photos ? prop('value', head(photos)) : null) || null
    const name = prop('displayName', profile)
    const email = prop(
      'value',
      head(prop('emails', profile).filter(email => email.type === 'account'))
    )

    const user = {
      googleId: id,
      name,
      avatar,
      email
    }

    return cb(null, user)
  }
)
