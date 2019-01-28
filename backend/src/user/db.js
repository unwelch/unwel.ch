import generateDefaults from './../db/defaults'

const tableName = 'users'
const primaryKeys = ['id']

export default {
  ...generateDefaults(tableName, primaryKeys)
}
