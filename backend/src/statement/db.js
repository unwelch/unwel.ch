import generateDefaults from './../db/defaults'

const tableName = 'statements'
const primaryKeys = ['id']

export default {
  ...generateDefaults(tableName, primaryKeys)
}
