import { squel, queryOne, query, defaultSquelConstructorParams } from './../db'
import { keysToUnderscore } from './../db/helpers'

export default {
  insert: async user => {
    let newUser = {
      ...user,
      createdAt: new Date()
    }

    return queryOne(
      squel
        .insert(defaultSquelConstructorParams)
        .into('users')
        .setFields(keysToUnderscore(newUser))
        .returning('*')
        .toParam()
    )
  },

  update: async user => {
    let newUser = {
      ...user,
      updatedAt: new Date()
    }

    return queryOne(
      squel
        .update(defaultSquelConstructorParams)
        .table('users')
        .setFields(keysToUnderscore(newUser))
        .where(`'${user.id}' = users.id`)
        .returning('*')
        .toParam()
    )
  },

  get: async id => {
    return queryOne(
      squel
        .select(defaultSquelConstructorParams)
        .from('users')
        .where('id = ?', id)
        .toParam()
    )
  },

  getAll: async () => {
    return query(
      squel
        .select(defaultSquelConstructorParams)
        .from('users')
        .toParam()
    )
  },

  getBy: {
    googleId: async id => {
      return queryOne(
        squel
          .select(defaultSquelConstructorParams)
          .from('users')
          .where('google_id = ?', id)
          .toParam()
      )
    }
  }
}
