import { afterEach, vi } from 'vitest';

describe('internationalization environment', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('uses the default language when the browser has no navigator', async () => {
    vi.stubGlobal('navigator', undefined);
    vi.resetModules();

    const { default: i18n } = await import('../i18n');

    expect(i18n.language).toBe('en-GB');
  });
});
