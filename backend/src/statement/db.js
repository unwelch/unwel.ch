import uuid from 'uuid/v4'
import { squel, query, queryOne, defaultSquelConstructorParams } from './../db'
import { keysToUnderscore } from './../db/helpers'

export default {
  insert: async statement => {
    let newStatement = {
      ...statement,
      id: statement.id ? statement.id : uuid(),
      createdAt: new Date()
    }

    return queryOne(
      squel
        .insert(defaultSquelConstructorParams)
        .into('statements')
        .setFields(keysToUnderscore(newStatement))
        .returning('*')
        .toString()
    )
  },

  get: async id => {
    return queryOne(
      squel
        .select(defaultSquelConstructorParams)
        .from('statements')
        .where('id = ?', id)
        .toString()
    )
  },

  getBy: {
    userId: async id => {
      return query(
        squel
          .select(defaultSquelConstructorParams)
          .from('statements')
          .where('user_id = ?', id)
          .toString()
      )
    }
  }
}
