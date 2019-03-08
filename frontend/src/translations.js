import React from 'react'

const translations = {
  en: {
    'bet-list.title': 'List of bets',
    'bet-status.waiting-for-opponent': 'Nobody accepted this bet yet',
    'bet-status.waiting-for-target-opponent':
      'Waiting for {{userName}} to accept',
    'bet-status.waiting-for-you': 'Waiting for you to accept',
    'bet-status.available-bet': 'Availabe',
    'bet-status.accepted-by-you': 'You accepted this bet',
    'bet-status.accepted-by-user': '{{user}} accepted this bet',
    'bet-status.waiting-for-user-response': 'Waiting for result',
    'bet-status.waiting-for-opponent-response':
      'Waiting for {{opponent}} to decide who won',
    'bet-status.won': 'Won',
    'bet-status.lost': 'Lost',
    'bet-status.dispute': 'Dispute',
    'bet-status.won.long': 'You won!',
    'bet-status.lost.long': 'You lost!',
    'bet-status.dispute.long': 'A disputed bet! One of you should be ashamed.',
    'bet-actions.accept-bet': 'Accept this bet',
    'bet-actions.copy-url': 'Copy URL',
    'bet-actions.share': 'Share bet',
    'bet-actions.delete': 'Delete',
    'bet-list.empty.title': 'You have no bets yet',
    'bet-404': 'Bet not found',
    'challenge-a-friend': 'Challenge {{userName}}',
    'create-a-bet': 'Create a bet',
    'create-account': 'Create account',
    'save-account-message':
      'You are using a temporal account on this device. Create an account to access unwelch from anywhere.',
    you: 'You',
    'bet-phrase.verb': 'bet',
    'bet-phrase.preposition': 'that',
    'new-bet-phrase.verb': 'I bet',
    'new-bet-phrase.preposition': 'that',
    'announce.bet-url-copied': 'Copied! Go find a friend to accept it',
    'announce.bet-accepted': 'Bet accepted',
    'announce.bet-marked-won': 'Bet marked as won',
    'announce.bet-marked-lost': 'Bet marked as lost',
    'announce.new-bet-created': 'New bet created',
    'copy-message.body': 'I think that {{statement}}. Wanna bet on it?'
  },
  es: {
    'titles.bet-list': 'Lista de apuestas',
    'bet-phrase.verb': 'apostó',
    'bet-phrase.preposition': 'que'
  }
}

const TranslatorContext = React.createContext(a => a)

const replaceParam = (key, replacement, target) =>
  target.replace(new RegExp('{{' + key + '}}', 'g'), replacement)

const replaceParams = (variables, string) => {
  if (!variables) return string

  Object.keys(variables).forEach(key => {
    string = replaceParam(key, variables[key], string)
  })

  return string
}

const translate = lang => (key, params) => {
  if (lang in translations) {
    if (key in translations[lang]) {
      return replaceParams(params, translations[lang][key])
    }
  }

  return `${lang}-${key}`
}

export const TranslatorProvider = ({ children, language }) => (
  <TranslatorContext.Provider value={translate(language)}>
    {children}
  </TranslatorContext.Provider>
)

export const TranslatorConsumer = TranslatorContext.Consumer
