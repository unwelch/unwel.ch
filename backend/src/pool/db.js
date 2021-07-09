import { squel, query, defaultSquelConstructorParams } from './../db'

import generateDefaults from './../db/defaults'

const tableName = 'pools'
const primaryKeys = ['id']
const orders = [{ column: 'created_at', direction: false }]

export default {
  ...generateDefaults(tableName, primaryKeys, orders),
  getRelatedToUser: async id => {
    // Returns pools created or participated by the user
    return query(
      squel
        .select(defaultSquelConstructorParams)
        .from(tableName, 'A')
        .where(
          '? in (select B.user_id from pool_bets B where B.pool_id = A.id) OR A.user_id = ?',
          id,
          id
        )
        .order('created_at', false)
        .toString()
    )
  }
}
