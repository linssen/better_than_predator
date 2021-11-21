module.exports = {
  defaultNamespace: 'translation',
  locales: ['en-GB'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}'],
  sort: true,
}
