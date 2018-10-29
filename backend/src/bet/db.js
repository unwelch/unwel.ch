import { squel, queryOne, query } from './../db'
import { keysToUnderscore } from './../db/helpers'

export default {
  insert: async bet => {
    let newBet = {
      ...bet,
      createdAt: new Date()
    }

    return queryOne(
      squel
        .insert()
        .into('bets')
        .setFields(keysToUnderscore(newBet))
        .returning('*')
        .toString()
    )
  },

  update: async bet => {
    let newBet = {
      ...bet,
      updatedAt: new Date()
    }

    return queryOne(
      squel
        .update()
        .table('bets')
        .setFields(keysToUnderscore(newBet))
        .where(`'${bet.id}' = bets.id`)
        .returning('*')
        .toString()
    )
  },

  get: async id => {
    const sql = squel.select().from('bets').where('id = ?', id).toString()
    return queryOne(sql)
  },

  getBy: {
    userId: async id => {
      return query(
        squel
          .select()
          .from('bets')
          .where('user_id = ? OR user2_id = ?', id, id)
          .order('created_at', false)
          .toString()
      )
    }
  },

  delete: async id => {
    return query(squel.delete().from('bets').where('id = ?', id).toString())
  }
}
