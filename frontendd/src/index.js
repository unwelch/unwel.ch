import React from 'react'
import ReactDOM from 'react-dom'
import { init as initSentry } from '@sentry/browser'

import App from './app'
import { init as initTracking } from './tracking'
import { registerServiceWorker } from './service-worker'

import './pwa'

if (process.env.NODE_ENV === 'production') {
  // start fullstory recording
  FS.restart()
}

if (process.env.NODE_ENV === 'production') {
  initSentry({
    dsn: 'https://630b4977fc2c4e0ba0d825cc3defbfdc@sentry.io/1292228'
  })
}

initTracking()

registerServiceWorker()

ReactDOM.render(<App />, document.getElementById('root'))
