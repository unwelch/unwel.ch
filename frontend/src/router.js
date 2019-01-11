import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from './layout'
import Announcer from './announce/page'
import SaveAccountPopup from './user/popup'

import NotFoundPage from './not-found'

const AsyncProfile = lazy(() =>
  import(/* webpackChunkName: "profile" */ './user/profile/page')
)
const AsyncSettings = lazy(() =>
  import(/* webpackChunkName: "settings" */ './user/settings/page')
)
const AsyncNotifications = lazy(() =>
  import(/* webpackChunkName: "notifications" */ './user/notifications/page')
)
const AsyncBetPage = lazy(() =>
  import(/* webpackChunkName: "bet-page" */ './bet/page')
)
const AsyncLoginPage = lazy(() =>
  import(/* webpackChunkName: "login" */ './login/page')
)

const AsyncSaveAccountPage = lazy(() =>
  import(/* webpackChunkName: "save-account" */ './login/save-account-page')
)

const AsyncBetList = lazy(() =>
  import(/* webpackChunkName: "bet-list" */ './bet/bet-list/page')
)
const AsyncNewBet = lazy(() =>
  import(/* webpackChunkName: "new-bet" */ './bet/new-bet/page')
)

const Router = () => (
  <Layout>
    <Switch>
      <Route
        exact
        path='/notifications'
        component={() => <AsyncNotifications />}
      />
      <Route exact path='/bets' component={() => <AsyncBetList />} />
      <Route exact path='/bets/new' component={() => <AsyncNewBet />} />
      <Route
        path='/bet/:id'
        component={props => (
          <AsyncBetPage betId={props.match.params.id} history={props.history} />
        )}
      />
      <Route
        path='/profiles/:id'
        component={props => <AsyncProfile userId={props.match.params.id} />}
      />
      <Route path='/settings' component={() => <AsyncSettings />} />
      <Route path='/login' component={() => <AsyncLoginPage />} />
      <Route
        path='/anonymous-login'
        component={() => <AsyncLoginPage anonymous />}
      />
      <Route path='/save-account' component={() => <AsyncSaveAccountPage />} />
      <Route component={() => <NotFoundPage />} />
    </Switch>
    <SaveAccountPopup />
    <Announcer />
  </Layout>
)

export default Router
