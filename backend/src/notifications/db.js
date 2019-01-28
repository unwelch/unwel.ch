import generateDefaults from './../db/defaults'

const tableName = 'notifications'
const primaryKeys = ['id']

export default {
  ...generateDefaults(tableName, primaryKeys)
}
