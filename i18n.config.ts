import landing from './locales/landing.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fa',
  messages: {
    "fa": {...landing}
  }
}))