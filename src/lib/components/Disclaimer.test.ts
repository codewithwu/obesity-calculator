import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Disclaimer from './Disclaimer.svelte';

describe('Disclaimer', () => {
  it('渲染默认文案', () => {
    render(Disclaimer, { props: { text: '本工具仅作参考' } });
    expect(screen.getByText('本工具仅作参考')).toBeInTheDocument();
  });

  it('带图标角色', () => {
    render(Disclaimer, { props: { text: '本工具仅作参考' } });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
