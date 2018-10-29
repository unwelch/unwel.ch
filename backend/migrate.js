import fs from 'fs'
import pg from 'pg'
import R from 'ramda'
import path from 'path'

require('dotenv').config()

process.on('unhandledRejection', (reason, p) => {
  console.log(p, 'reason:', reason)
})

const isDirectory = source => fs.lstatSync(source).isDirectory()

const getMigrations = () =>
  fs
    .readdirSync('./migrations')
    .filter(name => isDirectory(path.join('./migrations', name)))
    .map(name => parseInt(name, 10))
    .sort((a, b) => a - b)

const getFileFromVersion = (version, up) => `${version}/${up ? 'up' : 'down'}`

const readMigrationFile = file =>
  fs.readFileSync(`./migrations/${file}.sql`, 'utf8')

const getCurrentDBVersion = async client => {
  try {
    const res = await client.query('SELECT version FROM migrations')
    return parseInt(res.rows[0].version, 10)
  } catch (e) {}
  return 0
}

const migrate = async (client, targetDBVersion) => {
  const currentDBVersion = await getCurrentDBVersion(client)
  const migrations = getMigrations()

  if (!targetDBVersion) {
    console.log('Unspecified migration target')
    targetDBVersion = R.last(migrations)
  }

  console.log(`Migrating to version ${targetDBVersion}`)
  console.log(`Current db version: ${currentDBVersion}`)

  if (targetDBVersion === currentDBVersion) {
    console.log('No need for migration')
    return client.end()
  }

  const up = targetDBVersion > currentDBVersion

  const currentVersionIndex = migrations.indexOf(currentDBVersion)
  const targetVersionIndex = migrations.indexOf(targetDBVersion)

  const migrationsToRun = up
    ? migrations.slice(currentVersionIndex + 1, targetVersionIndex + 1)
    : migrations
        .slice(targetVersionIndex + 1, currentVersionIndex + 1)
        .reverse()

  for (let i = 0; i < migrationsToRun.length; i++) {
    const migration = migrationsToRun[i]
    console.log(`Applying migration ${migration} ${up ? 'up' : 'down'}`)
    const file = getFileFromVersion(migration, up)
    const query = readMigrationFile(file)
    await client.query(query)
  }

  await client.end()
  console.log('migration done')
}

console.log(`Migrating DB at ${process.env.DB_HOST}:${process.env.DB_PORT}`)

const main = async () => {
  let client
  try {
    client = new pg.Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: 'unwelch',
      port: process.env.DB_PORT
    })
    await client.connect()
  } catch (e) {
    console.log('Creating unwelch database')
    client = new pg.Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: 'postgres',
      port: process.env.DB_PORT
    })
    await client.connect()
    await client.query('CREATE DATABASE unwelch;')
    await client.end()
    client = new pg.Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: 'unwelch',
      port: process.env.DB_PORT
    })
    await client.connect()
  }

  migrate(client)
}

main()
