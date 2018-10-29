import { keysToCamelCase, keysToUnderscore } from './helpers'

describe('keysToCamelCase', () => {
  it('should work with empty values', () => {
    expect(keysToCamelCase({})).toEqual({})
  })

  it('should update keys from snake-case to camelCase', () => {
    expect(
      keysToCamelCase({
        result_from_data_base: 1,
        adult_things: 'choco'
      })
    ).toEqual({
      resultFromDataBase: 1,
      adultThings: 'choco'
    })
  })
})

describe('keysToUnderscore', () => {
  it('should work with empty values', () => {
    expect(keysToUnderscore({})).toEqual({})
  })

  it('should update keys from camelCase to underscores', () => {
    expect(
      keysToUnderscore({
        resultFromDataBase: 1,
        adultThings: 'choco'
      })
    ).toEqual({
      result_from_data_base: 1,
      adult_things: 'choco'
    })
  })
})
