import uuid from 'uuid/v4'
import { squel, query, queryOne } from './../db'
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
        .insert()
        .into('statements')
        .setFields(keysToUnderscore(newStatement))
        .returning('*')
        .toString()
    )
  },

  get: async id => {
    return queryOne(
      squel.select().from('statements').where('id = ?', id).toString()
    )
  },

  getBy: {
    userId: async id => {
      return query(
        squel.select().from('statements').where('user_id = ?', id).toString()
      )
    }
  }
}
