import i18n from '../i18n';

describe('translations', () => {
  it('loads punctuation-bearing keys from the supported locale', () => {
    expect(i18n.language).toBe('en-GB');
    expect(i18n.t('again!')).toBe('Again!');
  });
});
