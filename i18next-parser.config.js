module.exports = {
  defaultNamespace: 'translation',
  locales: ['en-GB', 'fr-FR', 'pt', 'pt-BR'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}', '!src/__tests__/**'],
  resetDefaultValueLocale: 'en-GB',
  sort: true,
};
