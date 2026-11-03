import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enGB from './locales/en-GB/translation.json';

i18n.use(initReactI18next).init({
  lng: 'en-GB',
  fallbackLng: 'en-GB',
  supportedLngs: ['en-GB'],
  load: 'currentOnly',
  debug: import.meta.env.DEV,
  resources: {
    'en-GB': {
      translation: enGB,
    },
  },
  react: {
    useSuspense: true,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
