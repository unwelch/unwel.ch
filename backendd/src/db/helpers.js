import R from 'ramda'

const camelCase = str => {
  return str.replace(/_([a-z])/g, c => {
    return R.toUpper(c[1])
  })
}

const toUnderscore = str => {
  return str.replace(/([A-Z])/g, c => {
    return R.concat('_', R.toLower(c))
  })
}

const mapKeys = R.curry((fn, obj) =>
  R.pipe(R.toPairs, R.map(R.adjust(fn, 0)), R.fromPairs)(obj)
)

export const keysToCamelCase = mapKeys(camelCase)
export const keysToUnderscore = mapKeys(toUnderscore)
