export const getAuth = state => state.auth
export const getToken = state => getAuth(state).token
export const getIsLoggedIn = state => getToken(state) != null
export const getIsAnonymous = state => getAuth(state).isLoggedIn
