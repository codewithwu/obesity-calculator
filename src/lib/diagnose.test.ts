import { describe, it, expect } from 'vitest';
import { diagnose } from './diagnose';

const standardAsian = { height: 170, weight: 65, waist: 82 };

describe('diagnose - 亚裔', () => {
  it('BMI < 18.5 判定为偏瘦', () => {
    // height 170, weight 50 → BMI 17.3
    const r = diagnose({ height: 170, weight: 50, waist: 65 });
    expect(r.category).toBe('underweight');
    expect(r.metrics.bmiLabel).toBe('偏瘦');
  });

  it('BMI 18.5-22.9 且 WHtR < 0.5 且 腰围 < 80 判定为正常', () => {
    // height 170, weight 60 → BMI 20.8
    const r = diagnose({ height: 170, weight: 60, waist: 75 });
    expect(r.category).toBe('normal');
    expect(r.metrics.whtrLabel).toBe('正常');
    expect(r.metrics.waistLabel).toBe('正常');
  });

  it('BMI 18.5 边界归为正常', () => {
    // height 170, weight 53.465 → BMI 18.5
    const r = diagnose({ height: 170, weight: 53.465, waist: 75 });
    expect(r.category).toBe('normal');
  });

  it('BMI 23 边界 + WHtR<0.5 + waist<80 归为超重（不是肥胖）', () => {
    // height 170, weight 66.47 → BMI 23.0
    const r = diagnose({ height: 170, weight: 66.47, waist: 75 });
    expect(r.category).toBe('overweight');
  });

  it('BMI 23 边界 + WHtR=0.5 边界 触发肥胖', () => {
    // height 170, weight 66.47, waist 85 → BMI 23.0, WHtR 0.5
    const r = diagnose({ height: 170, weight: 66.47, waist: 85 });
    expect(r.category).toBe('obese');
  });

  it('BMI 23-27.4 且 WHtR < 0.5 且 腰围 < 80 判定为超重', () => {
    // height 170, weight 70 → BMI 24.2
    const r = diagnose({ height: 170, weight: 70, waist: 75 });
    expect(r.category).toBe('overweight');
  });

  it('BMI 23-27.4 且 WHtR ≥ 0.5 触发肥胖', () => {
    // height 170, weight 70, waist 86 → BMI 24.2, WHtR 0.506
    const r = diagnose({ height: 170, weight: 70, waist: 86 });
    expect(r.category).toBe('obese');
    expect(r.triggers.some(t => t.includes('腰高比'))).toBe(true);
  });

  it('BMI 23-27.4 且 腰围 ≥ 80 触发肥胖', () => {
    // height 170, weight 70, waist 82 → WHtR 0.482 (low) but waist 82 ≥ 80
    const r = diagnose({ height: 170, weight: 70, waist: 82 });
    expect(r.category).toBe('obese');
    expect(r.metrics.whtrLabel).toBe('正常');
    expect(r.metrics.waistLabel).toBe('超标');
  });

  it('BMI ≥ 27.5 直接判定肥胖', () => {
    // height 170, weight 80 → BMI 27.7
    const r = diagnose({ height: 170, weight: 80, waist: 75 });
    expect(r.category).toBe('obese');
  });

  it('BMI 27.5 边界归为肥胖', () => {
    // height 170, weight 79.475 → BMI 27.5
    const r = diagnose({ height: 170, weight: 79.475, waist: 75 });
    expect(r.category).toBe('obese');
  });

  it('返回的指标经过四舍五入', () => {
    const r = diagnose({ height: 170, weight: 70, waist: 82 });
    expect(r.metrics.bmi).toBe(24.2);
    expect(r.metrics.whtr).toBe(0.48);
  });

  it('waistThresholdUsed 始终是默认（严）值', () => {
    const r = diagnose(standardAsian);
    expect(r.metrics.waistThresholdUsed).toBe(80);
  });

  it('正常分类下 recommendation 文案正确', () => {
    const r = diagnose({ height: 170, weight: 60, waist: 75 });
    expect(r.recommendation).toContain('维持');
  });

  it('肥胖分类下 recommendation 引导就医', () => {
    const r = diagnose({ height: 170, weight: 80, waist: 75 });
    expect(r.recommendation).toContain('医院');
  });
});

describe('diagnose - 非亚裔', () => {
  it('BMI 25-29.9 判定为超重', () => {
    // height 170, weight 75 → BMI 26.0
    const r = diagnose({ height: 170, weight: 75, waist: 80 }, 'non-asian');
    expect(r.category).toBe('overweight');
  });

  it('BMI ≥ 30 判定为肥胖', () => {
    // height 170, weight 90 → BMI 31.1
    const r = diagnose({ height: 170, weight: 90, waist: 80 }, 'non-asian');
    expect(r.category).toBe('obese');
  });

  it('非亚裔默认腰围阈值为 88', () => {
    const r = diagnose({ height: 170, weight: 72.25, waist: 80 }, 'non-asian');
    // BMI 25.0 (overweight boundary), WHtR 0.47, waist 80 < 88 → 超重
    expect(r.category).toBe('overweight');
    expect(r.metrics.waistThresholdUsed).toBe(88);
  });

  it('非亚裔 BMI 25 + 腰围 88 触发肥胖', () => {
    // height 170, weight 75, waist 88 → BMI 26, WHtR 0.518
    const r = diagnose({ height: 170, weight: 75, waist: 88 }, 'non-asian');
    expect(r.category).toBe('obese');
  });
});
