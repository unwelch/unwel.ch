import React from 'react'

const translations = {
  en: {
    'bet-list-page-title': 'List of bets'
  },
  es: {
    'bet-list-page-title': 'Lista de apuestas'
  }
}

const TranslatorContext = React.createContext(a => a)

const translate = lang => key => {
  if (lang in translations) {
    if (key in translations[lang]) {
      return translations[lang][key]
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
