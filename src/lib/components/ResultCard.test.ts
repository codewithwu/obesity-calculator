import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ResultCard from './ResultCard.svelte';
import type { DiagnosisResult } from '../types';

const mockResult: DiagnosisResult = {
  category: 'obese',
  metrics: {
    bmi: 25.4,
    whtr: 0.51,
    bmiLabel: '超重',
    whtrLabel: '超标',
    waistLabel: '超标',
    waistThresholdUsed: 80
  },
  triggers: ['BMI 25.4 处于超重范围', '腰高比 0.51 ≥ 0.5'],
  recommendation: '建议前往医院。',
  disclaimer: '仅作参考。'
};

const mockWaist = 82;

describe('ResultCard', () => {
  it('显示分类中文大标题', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText('肥胖')).toBeInTheDocument();
  });

  it('显示 BMI 数值', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText('25.4')).toBeInTheDocument();
  });

  it('显示 WHtR 数值', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText('0.51')).toBeInTheDocument();
  });

  it('显示腰围数值', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText(/82/)).toBeInTheDocument();
  });

  it('显示触发条件列表', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText('BMI 25.4 处于超重范围')).toBeInTheDocument();
    expect(screen.getByText('腰高比 0.51 ≥ 0.5')).toBeInTheDocument();
  });

  it('显示建议文案', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText('建议前往医院。')).toBeInTheDocument();
  });

  it('显示腰围阈值提示', () => {
    render(ResultCard, { props: { result: mockResult, waist: mockWaist } });
    expect(screen.getByText(/女性标准/)).toBeInTheDocument();
  });
});
