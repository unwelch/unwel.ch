import { squel, queryOne, query, defaultSquelConstructorParams } from '.'
import { keysToUnderscore, toUnderscore } from './helpers'

export default (tableName, primaryKeys) => {
  primaryKeys = primaryKeys.map(toUnderscore)

  return {
    insert: async object => {
      return queryOne(
        squel
          .insert(defaultSquelConstructorParams)
          .into(tableName)
          .setFields(keysToUnderscore(object))
          .returning('*')
          .toString()
      )
    },

    update: async object => {
      object = keysToUnderscore(object)
      primaryKeys.forEach(key => {
        if (!object[key]) {
          throw new Error('Missing required primary key ' + key)
        }
      })

      const sql = squel
        .update(defaultSquelConstructorParams)
        .table(tableName)
        .setFields(object)

      primaryKeys.forEach(key => {
        sql.where(`${key} = ?`, object[key])
      })

      return queryOne(sql.returning('*').toString())
    },

    get: async (...keys) => {
      if (keys.length !== primaryKeys.length) {
        throw new Error(
          `Different numbers of values provided (${
            keys.length
          }) than primary keys (${primaryKeys.length}) for table ${tableName}`
        )
      }
      const sql = squel.select(defaultSquelConstructorParams).from(tableName)

      keys.forEach((v, i) => {
        sql.where(`${primaryKeys[i]} = ?`, v)
      })

      return queryOne(sql.toString())
    },

    getBy: async (column, value) => {
      const sql = squel.select(defaultSquelConstructorParams).from(tableName)

      if (value === null) {
        sql.where(`${toUnderscore(column)} IS NULL`)
      } else {
        sql.where(`${toUnderscore(column)} = ?`, value)
      }

      return query(sql.toString())
    },

    getAll: async () => {
      const sql = squel
        .select(defaultSquelConstructorParams)
        .from(tableName)
        .toString()
      return query(sql)
    },

    delete: async (...keys) => {
      if (keys.length !== primaryKeys.length) {
        throw new Error(
          'Different numbers of values provided than primary keys for table ' +
            tableName
        )
      }

      const sql = squel.delete(defaultSquelConstructorParams).from(tableName)
      keys.forEach((v, i) => {
        sql.where(`${primaryKeys[i]} = ?`, v)
      })

      return query(sql.toString())
    }
  }
}
