import { squel, query, defaultSquelConstructorParams } from './../db'

import generateDefaults from './../db/defaults'

const tableName = 'bets'
const primaryKeys = ['id']

export default {
  ...generateDefaults(tableName, primaryKeys),
  getByUserOrUser2: async id => {
    return query(
      squel
        .select(defaultSquelConstructorParams)
        .from(tableName)
        .where('user_id = ? OR user2_id = ?', id, id)
        .order('created_at', false)
        .toString()
    )
  }
}
