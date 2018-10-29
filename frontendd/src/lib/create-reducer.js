const missingActions = () => {
  throw new Error('No action passed to reducer')
}

const createReducer = (initialState, actionMap) => {
  return (state = initialState, action = missingActions()) => {
    const updater = actionMap[action.type]
    return updater === undefined ? state : updater(state, action)
  }
}

export default createReducer
