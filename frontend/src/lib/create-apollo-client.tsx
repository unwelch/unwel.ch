import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_HOST } from './../config'

const httpLink = createHttpLink({
  uri: API_HOST + '/graphql'
})

const createAuthLink = token => {
  return setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })
}

const createApolloClient = token => {
  return new ApolloClient({
    link: createAuthLink(token).concat(httpLink),
    cache: new InMemoryCache()
  })
}

export default createApolloClient
