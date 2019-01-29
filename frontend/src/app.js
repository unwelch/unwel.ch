import React, { Component, lazy, Suspense } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { ApolloProvider } from 'react-apollo'
import createBrowserHistory from 'history/createBrowserHistory'
import { injectGlobal } from 'styled-components'
import { configureScope as configureSentryScope } from '@sentry/browser'

import BaseStyles from 'components/base-styles'
import ResponsiveProvider from 'components/responsive-provider'

import createStore from './lib/create-store'
import createApolloClient from './lib/create-apollo-client'
import { loadUser } from './user/auth/token'
import { setToken } from './user/auth/actions'
import { trackEvent, identify, events } from './tracking'
import { TranslatorProvider } from './translations'

const AsyncHome = lazy(() =>
  import(/* webpackChunkName: "home" */ './home/page')
)

const AsyncRouter = lazy(() =>
  import(/* webpackChunkName: "router" */ './router')
)

const removeLoader = () => {
  const loader = document.getElementById('loader')
  if (loader) {
    loader.remove()
  }
}

class SpinnerRemover extends Component {
  componentWillUnmount () {
    removeLoader()
  }

  render () {
    return null
  }
}

const history = createBrowserHistory()
const store = createStore(history)

const { token, isLoggedIn, userId } = loadUser(window.location)

if (token) {
  store.dispatch(setToken(token))

  if (process.env.NODE_ENV === 'production') {
    configureSentryScope(scope => {
      scope.setUser({ id: userId })
    })
  }

  setTimeout(() => {
    identify(userId)
    FS.identify(userId)

    if (isLoggedIn) {
      trackEvent(events.loggedIn)
    }
  }, 1000)
}

const client = createApolloClient(token)

setTimeout(
  () =>
    trackEvent(events.applicationLoaded, {
      url: window.location.pathname,
      referrer: document.referrer,
      loggedIn: !!token
    }),
  1000
)

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  :focus {outline:none;}
  ::-moz-focus-inner {border:0;}
`

const App = () => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <Suspense fallback={<SpinnerRemover />}>
        <TranslatorProvider language='en'>
          <ResponsiveProvider>
            <ConnectedRouter history={history}>
              <BaseStyles>
                <Switch>
                  <Route exact path='/' component={() => <AsyncHome />} />
                  <Route component={() => <AsyncRouter />} />
                </Switch>
              </BaseStyles>
            </ConnectedRouter>
          </ResponsiveProvider>
        </TranslatorProvider>
      </Suspense>
    </StoreProvider>
  </ApolloProvider>
)

export default App
