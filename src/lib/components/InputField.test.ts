import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import InputField from './InputField.svelte';

describe('InputField', () => {
  it('渲染标签、单位、占位', () => {
    render(InputField, {
      props: { label: '身高', unit: 'cm', value: null, min: 100, max: 250, step: 0.1 }
    });
    expect(screen.getByText('身高')).toBeInTheDocument();
    expect(screen.getByText('cm')).toBeInTheDocument();
  });

  it('值变更时触发 onchange 回调', async () => {
    const user = userEvent.setup();
    let captured: number | null = null;
    render(InputField, {
      props: {
        label: '身高',
        unit: 'cm',
        value: null,
        min: 100,
        max: 250,
        step: 0.1,
        onchange: (n: number | null) => {
          captured = n;
        }
      }
    });
    const input = screen.getByLabelText('身高') as HTMLInputElement;
    await user.type(input, '170');
    expect(captured).toBe(170);
  });

  it('校验失败时显示错误信息', () => {
    render(InputField, {
      props: {
        label: '身高',
        unit: 'cm',
        value: 50,
        min: 100,
        max: 250,
        step: 0.1
      }
    });
    expect(screen.getByText(/请输入 100 ~ 250/)).toBeInTheDocument();
  });

  it('校验通过时不显示错误', () => {
    render(InputField, {
      props: {
        label: '身高',
        unit: 'cm',
        value: 170,
        min: 100,
        max: 250,
        step: 0.1
      }
    });
    expect(screen.queryByText(/请输入/)).not.toBeInTheDocument();
  });
});
