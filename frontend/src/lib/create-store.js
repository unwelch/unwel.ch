import { combineReducers, createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import userReducer from '../user/auth/reducers'
import announceReducer from '../announce/reducers'

const createReduxStore = (history, persistedState) => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      routing: routerReducer,
      announces: announceReducer
    }),
    persistedState,
    applyMiddleware(thunk, routerMiddleware(history))
  )

  return store
}

export default createReduxStore
