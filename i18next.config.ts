import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['en-GB', 'fr-FR', 'pt', 'pt-BR'],
  extract: {
    input: ['src/**/*.{ts,tsx}', '!src/__tests__/**'],
    output: 'src/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation',
    functions: ['t', '*.t'],
    transComponents: ['Trans'],
    primaryLanguage: 'en-GB',
    sort: true,
  },
});
