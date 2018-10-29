export function saveTempAccept (betId) {
  window.sessionStorage.setItem('temp_accept', betId)
}

export function checkTempAccept () {
  const betId = window.sessionStorage.getItem('temp_accept')

  if (betId) {
    window.sessionStorage.removeItem('temp_accept')
    return betId
  }
}

export function saveTempStatement (statement, bet) {
  window.sessionStorage.setItem('temp_statement', statement)
  window.sessionStorage.setItem('temp_bet', bet)
}

export function checkTempStatement () {
  const statement = window.sessionStorage.getItem('temp_statement')
  const bet = window.sessionStorage.getItem('temp_bet')

  if (statement && bet) {
    window.sessionStorage.removeItem('temp_bet')
    window.sessionStorage.removeItem('temp_statement')
    return { statement, bet }
  }
}
