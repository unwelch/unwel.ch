import React from 'react'

const translations = {
  en: {
    'bet-list.title': 'List of bets',
    'bet-status.waiting-for-opponent': 'Nobody accepted this bet yet',
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
    'bet-list.empty.title': 'Create a new bet',
    'bet-list.empty.description': 'Your bets will appear in this list',
    'create-a-bet': 'Create a bet',
    you: 'You',
    'bet-phrase.verb': 'bet',
    'bet-phrase.preposition': 'that'
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
