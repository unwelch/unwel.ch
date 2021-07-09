import generateDefaults from './../db/defaults'

const tableName = 'pool_bets'
const primaryKeys = ['id']
const orders = [{ column: 'created_at', direction: false }]

export default {
  ...generateDefaults(tableName, primaryKeys, orders)
}
