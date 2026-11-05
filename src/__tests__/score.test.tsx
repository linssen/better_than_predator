import React from 'react';
import { render } from '@testing-library/react';
import Score from '../components/Score';

describe('Score', () => {
  it('renders the percentage as a circular stroke value', () => {
    const { container } = render(<Score percent={76} />);

    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 36 36');
    expect(container.querySelectorAll('path')).toHaveLength(2);
    expect(container.querySelectorAll('path')[1].getAttribute('stroke-dasharray')).toBe('76, 100');
  });
});
