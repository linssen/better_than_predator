module.exports = {
  defaultNamespace: 'translation',
  locales: ['en'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}'],
  sort: true,
}
