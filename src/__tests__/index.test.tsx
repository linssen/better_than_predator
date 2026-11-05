import { act } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

describe('application entry point', () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock('react-dom/client');
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('throws when the root element is missing', async () => {
    document.body.innerHTML = '';
    await expect(import('../index')).rejects.toThrow('Root element not found');
  });

  it('mounts the application into the root element', async () => {
    const render = vi.fn();
    const createRoot = vi.fn(() => ({ render }));
    vi.doMock('react-dom/client', () => ({ createRoot }));

    await act(async () => {
      await import('../index');
    });

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(render).toHaveBeenCalledOnce();
  });
});
