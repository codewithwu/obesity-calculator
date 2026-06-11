import { describe, it, expect } from 'vitest';
import { THRESHOLDS, getThresholds } from './thresholds';

describe('THRESHOLDS 常量', () => {
  it('亚裔阈值符合 2026 ADA 新标准', () => {
    expect(THRESHOLDS.asian).toEqual({
      bmiOverweightMin: 23,
      bmiObeseMin: 27.5,
      waistDefault: 80,
      waistMale: 90,
      whtr: 0.5
    });
  });

  it('非亚裔阈值为国际通用标准', () => {
    expect(THRESHOLDS['non-asian']).toEqual({
      bmiOverweightMin: 25,
      bmiObeseMin: 30,
      waistDefault: 88,
      waistMale: 102,
      whtr: 0.5
    });
  });
});

describe('getThresholds', () => {
  it('默认返回亚裔阈值', () => {
    expect(getThresholds()).toBe(THRESHOLDS.asian);
  });

  it('显式传 asian 返回亚裔阈值', () => {
    expect(getThresholds('asian')).toBe(THRESHOLDS.asian);
  });

  it('传 non-asian 返回非亚裔阈值', () => {
    expect(getThresholds('non-asian')).toBe(THRESHOLDS['non-asian']);
  });
});
