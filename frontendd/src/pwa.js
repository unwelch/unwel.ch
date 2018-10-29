import { trackEvent, events } from './tracking'

let deferredPromptEvent

window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()

  // Stash the event so it can be triggered later.
  deferredPromptEvent = e
})

export const canInstall = () => !!deferredPromptEvent
export const promptInstall = () => {
  trackEvent(events.pwaHomeScreenPrompted)
  deferredPromptEvent.prompt()

  deferredPromptEvent.userChoice.then(choice => {
    if (choice.outcome === 'dismissed') {
      trackEvent(events.pwaHomeScreenDismissed)
    } else {
      trackEvent(events.pwaHomeScreenAdded)
    }
  })
}
