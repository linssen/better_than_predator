import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enGB from './locales/en-GB/translation.json';
import frFR from './locales/fr-FR/translation.json';
import pt from './locales/pt/translation.json';
import ptBR from './locales/pt-BR/translation.json';

const defaultLanguage = 'en-GB';
const resources = {
  'en-GB': {
    translation: enGB,
  },
  'fr-FR': {
    translation: frFR,
  },
  pt: {
    translation: pt,
  },
  'pt-BR': {
    translation: ptBR,
  },
};
const supportedLanguages = Object.keys(resources);

export function getPreferredLanguage(
  browserLanguage: string | undefined,
  languages: string[] = supportedLanguages,
): string {
  if (!browserLanguage) return defaultLanguage;

  const normalizedBrowserLanguage = browserLanguage.toLowerCase();
  return (
    languages.find((language) => language.toLowerCase() === normalizedBrowserLanguage) ??
    languages.find(
      (language) =>
        language.split('-')[0].toLowerCase() === normalizedBrowserLanguage.split('-')[0],
    ) ??
    defaultLanguage
  );
}

const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : undefined;

i18n.use(initReactI18next).init({
  lng: getPreferredLanguage(browserLanguage),
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguages,
  load: 'currentOnly',
  debug: import.meta.env.DEV,
  resources,
  react: {
    useSuspense: true,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
