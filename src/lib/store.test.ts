import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { measurements, ethnicity, reset, setEthnicity } from './store';

describe('measurements store', () => {
  beforeEach(() => {
    reset();
  });

  it('初始为 null', () => {
    expect(get(measurements)).toBeNull();
  });

  it('set 后可读出', () => {
    measurements.set({ height: 170, weight: 65, waist: 82 });
    expect(get(measurements)).toEqual({ height: 170, weight: 65, waist: 82 });
  });

  it('reset 后回到 null', () => {
    measurements.set({ height: 170, weight: 65, waist: 82 });
    reset();
    expect(get(measurements)).toBeNull();
  });
});

describe('ethnicity store', () => {
  beforeEach(() => {
    reset();
  });

  it('默认 asian', () => {
    expect(get(ethnicity)).toBe('asian');
  });

  it('setEthnicity 可切换', () => {
    setEthnicity('non-asian');
    expect(get(ethnicity)).toBe('non-asian');
  });
});
