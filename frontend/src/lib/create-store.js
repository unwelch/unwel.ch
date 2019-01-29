import { combineReducers, createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import authReducers from '../user/auth/reducers'
import announceReducer from '../announce/reducers'
import userReducer from '../user/reducers'

const createReduxStore = (history, persistedState) => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      auth: authReducers,
      routing: routerReducer,
      announces: announceReducer
    }),
    persistedState,
    applyMiddleware(thunk, routerMiddleware(history))
  )

  return store
}

export default createReduxStore
