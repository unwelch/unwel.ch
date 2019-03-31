import { squel, query, defaultSquelConstructorParams } from './../db'

import generateDefaults from './../db/defaults'

const tableName = 'bets'
const primaryKeys = ['id']
const orders = [{ column: 'created_at', direction: false }]

export default {
  ...generateDefaults(tableName, primaryKeys, orders),
  getByUserOrUser2: async id => {
    return query(
      squel
        .select(defaultSquelConstructorParams)
        .from(tableName)
        .where('user_id = ? OR user2_id = ?', id, id)
        .order('created_at', false)
        .toString()
    )
  },
  getPublicLimit: async limit => {
    return query(
      squel
        .select(defaultSquelConstructorParams)
        .from(tableName)
        .where('is_private = ?', false)
        .order('created_at', false)
        .limit(limit)
        .toString()
    )
  }
}
