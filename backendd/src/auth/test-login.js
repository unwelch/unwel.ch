import UserDB from '../user/db'
import SECRET from '../user/secret'
import jwt from 'jsonwebtoken'

export default app => {
  app.post('/auth/anonymous', async function (req, res) {
    const { name } = req.body

    const user = await UserDB.insert({
      name
    })

    const token = jwt.sign(
      { userId: user.id, logged_at: Math.floor(Date.now() / 1000) },
      SECRET
    )

    res.send(
      JSON.stringify({
        token,
        id: user.id
      })
    )
  })
}
