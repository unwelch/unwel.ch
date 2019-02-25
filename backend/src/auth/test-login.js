import jwt from 'jsonwebtoken'

import UserDB from '../user/db'
import { getTokenSecret } from './token'

const anonymousAuthMiddleware = async function(req, res) {
  const { name } = req.body

  const user = await UserDB.insert({
    name
  })

  const token = jwt.sign(
    { userId: user.id, logged_at: Math.floor(Date.now() / 1000) },
    getTokenSecret()
  )

  res.send(
    JSON.stringify({
      token,
      id: user.id
    })
  )
}

export default anonymousAuthMiddleware
