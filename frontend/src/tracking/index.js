import amplitude from 'amplitude-js'

export const events = {
  pageLoaded: 'pageLoaded',
  githubClick: 'githubClick',
  betLinkCopied: 'betLinkCopied',
  betDeleted: 'betDeleted',
  betAccepted: 'betAccepted',
  loggedIn: 'loggedIn',
  applicationLoaded: 'applicationLoaded',
  loginRequested: 'loginRequested',
  saveAccountRequest: 'saveAccountRequest',
  acceptBetClick: 'acceptBetClick',
  feedbackSubmitted: 'feedbackSubmitted',
  feedbackOpened: 'feedbackOpened',
  pwaHomeScreenPrompted: 'pwaHomeScreenPrompted',
  pwaHomeScreenDismissed: 'pwaHomeScreenDismissed',
  pwaHomeScreenAdded: 'pwaHomeScreenAdded'
}

export const init = () => {
  return new Promise(resolve => {
    const key =
      process.env.NODE_ENV === 'production'
        ? '16621e1ae779c55cd67c2eda1610325b'
        : 'd78524420bd27e783198933c03a59aca'

    amplitude.getInstance().init(key, null, null, resolve)
  })
}

export const identify = userId => {
  amplitude.getInstance().setUserId(userId)
}

export const trackEvent = (type, props) => {
  amplitude.getInstance().logEvent(type, props)
}
