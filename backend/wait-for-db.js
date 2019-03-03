import pg from 'pg'

require('dotenv').config()

const main = async () => {
  console.log('Connecting to ', process.env.DB_HOST + ':' + process.env.DB_PORT)

  const client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: 'postgres',
    port: process.env.DB_PORT
  })

  try {
    await client.connect()
    console.log('Connected to DB')
    process.exit(0)
  } catch (err) {}
}

setInterval(() => {
  main()
  console.log('Waiting for DB to be ready...')
}, 500)
