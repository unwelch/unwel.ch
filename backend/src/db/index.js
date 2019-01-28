import pg from 'pg'
import squel from 'squel'
import { escape } from 'sqlstring'
import R from 'ramda'

import { keysToCamelCase } from './helpers'

const types = pg.types
const timestampOID = 1114
types.setTypeParser(
  timestampOID,
  stringValue => new Date(Date.parse(stringValue + '+0000'))
)

let client

export const init = async config => {
  if (client != null) {
    throw new Error('Cannot init an already initialized DB')
  }
  client = new pg.Client(config)
  await client.connect()
}

export const test = () => queryOne('SELECT NOW() as date')

export const runSQL = async q => client.query(q)

export const query = async q => {
  const resp = await client.query(q)
  return R.map(keysToCamelCase, resp.rows)
}

export const queryOne = async q => {
  const res = await query(q)
  return res[0]
}

export const end = () => {
  const endPromise = client.end()
  client = undefined
  return endPromise
}

const squelPostgres = squel.useFlavour('postgres')
squelPostgres.registerValueHandler(Date, date => `'${date.toISOString()}'`)
squel.registerValueHandler('string', s => escape(s))

export const defaultSquelConstructorParams = {
  replaceSingleQuotes: true,
  singleQuoteReplacement: "''"
}

export { squelPostgres as squel }
