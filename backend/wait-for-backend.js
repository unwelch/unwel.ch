import fetch from 'node-fetch'

require('dotenv').config()

const URL = 'http://localhost:3000/_health'

const main = async () => {
  console.log(`Connecting to ${URL}`)

  try {
    const response = await fetch(URL)
    await response.json()
    // const json = await response.json()
    // console.log(json)

    console.log('Connected to Backend')
    process.exit(0)
  } catch (err) {
    // console.log(err.message)
  }
}

setInterval(() => {
  main()
  console.log('Waiting for Backend to be ready...')
}, 2000)
