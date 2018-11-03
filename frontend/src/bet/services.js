import JSONParser from 'json-parse-safe'

const PREFIX_UNWELCH = '_unwelch/'

const saveToSession = key => value => {
  window.sessionStorage.setItem(PREFIX_UNWELCH + key, JSON.stringify(value))
}

const getOnceFromSession = key => () => {
  const value = window.sessionStorage.getItem(PREFIX_UNWELCH + key)
  const parsedValue = JSONParser(value)
  if (parsedValue.error) {
    return null
  }

  window.sessionStorage.removeItem(PREFIX_UNWELCH + key)

  return parsedValue
}

export const saveTempAccept = saveToSession('temp_accept')
export const saveTempStatement = saveToSession('temp_bet')

export const checkTempAccept = getOnceFromSession('temp_accept')
export const checkTempStatement = getOnceFromSession('temp_bet')
