import type { Ethnicity, Thresholds } from './types';

export const THRESHOLDS: Record<Ethnicity, Thresholds> = {
  asian: {
    bmiOverweightMin: 23,
    bmiObeseMin: 27.5,
    waistDefault: 80,
    waistMale: 90,
    whtr: 0.5
  },
  'non-asian': {
    bmiOverweightMin: 25,
    bmiObeseMin: 30,
    waistDefault: 88,
    waistMale: 102,
    whtr: 0.5
  }
};

export function getThresholds(e: Ethnicity = 'asian'): Thresholds {
  return THRESHOLDS[e];
}
