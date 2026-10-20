import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/index.css'
import { PreferencesProvider } from '@/components/PreferencesProvider'
import { I18nProvider } from '@/i18n'
import App from './App'

// A note for whoever opens the console.
console.info(
  '%cAlireza portfolio%c\nYou opened DevTools — good instinct.\nTry the terminal: `sudo hire alireza`. Or the Konami code.',
  'font: 600 14px ui-monospace, monospace; color: #4d8dff',
  'font: 12px ui-monospace, monospace; color: #a0a7b3',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </PreferencesProvider>
  </StrictMode>,
)
