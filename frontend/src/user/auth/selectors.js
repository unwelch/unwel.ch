export const getUser = state => state.user
export const getAuth = state => getUser(state).auth
export const getToken = state => getAuth(state).token
export const getIsLoggedIn = state => getToken(state) != null
export const getIsAnonymous = state => getAuth(state).isLoggedIn
