import { afterEach } from 'vitest';
import i18n, { getPreferredLanguage } from '../i18n';
import enGB from '../locales/en-GB/translation.json';
import frFR from '../locales/fr-FR/translation.json';
import pt from '../locales/pt/translation.json';
import ptBR from '../locales/pt-BR/translation.json';

describe('translations', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en-GB');
  });

  it('loads punctuation-bearing keys from the supported locale', () => {
    expect(i18n.language).toBe('en-GB');
    expect(i18n.t('again!')).toBe('Again!');
  });

  it('provides a French translation for every English key', () => {
    expect(Object.keys(frFR).sort()).toEqual(Object.keys(enGB).sort());
    expect(i18n.options.supportedLngs).toContain('fr-FR');
  });

  it('provides complete Portuguese translations and selects regional variants', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(enGB).sort());
    expect(Object.keys(ptBR).sort()).toEqual(Object.keys(enGB).sort());
    expect(i18n.options.supportedLngs).toEqual(expect.arrayContaining(['pt', 'pt-BR']));
    expect(getPreferredLanguage('pt-BR')).toBe('pt-BR');
    expect(getPreferredLanguage('pt-PT')).toBe('pt');
    expect(getPreferredLanguage('pt')).toBe('pt');
    expect(getPreferredLanguage('es-MX')).toBe('en-GB');
    expect(getPreferredLanguage(undefined)).toBe('en-GB');
    expect(getPreferredLanguage('fr-FR', [])).toBe('en-GB');
  });

  it('preserves proper nouns in both Portuguese translations', () => {
    expect(pt.pageTitle).toBe('Better Than Predator');
    expect(pt.reasonAndCredit).toContain('<wil>Wil</wil>, <greg>Greg</greg> e Glen');
    expect(pt.reasonAndCredit).toContain('Predator');
    expect(ptBR.pageTitle).toBe('Better Than Predator');
    expect(ptBR.reasonAndCredit).toContain('<wil>Wil</wil>, <greg>Greg</greg> e Glen');
    expect(ptBR.reasonAndCredit).toContain('Predator');
    expect(ptBR.copyright).toContain('GitHub');
    expect(ptBR.copyright).toContain('themoviedb.org');
  });

  it('keeps proper nouns and film titles unchanged in French', async () => {
    await i18n.changeLanguage('fr-FR');

    expect(i18n.t('pageTitle')).toBe('Better Than Predator');
    expect(i18n.t('reasonAndCredit')).toContain('<wil>Wil</wil>, <greg>Greg</greg> et Glen');
    expect(i18n.t('reasonAndCredit')).toContain('Predator');
    expect(i18n.t('copyright', { year: 2026 })).toContain('sur GitHub');
    expect(i18n.t('copyright', { year: 2026 })).toContain('themoviedb.org');
    expect(i18n.t('winnerAnnounce', { winner: 'Le Parrain' })).toBe('Le Parrain gagne !');
  });
});
