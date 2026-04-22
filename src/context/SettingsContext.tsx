import { createContext, useState, useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Language = 'my' | 'en' | 'th'
type Currency = 'MMK' | 'THB' | 'USD'

interface SettingsContextType {
  language: Language
  setLanguage: (lang: Language) => void
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en'
  })
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency')
    return (saved as Currency) || 'MMK'
  })

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }, [language, i18n])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr)
  }

  return (
    <SettingsContext.Provider value={{ language, setLanguage, currency, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext }
