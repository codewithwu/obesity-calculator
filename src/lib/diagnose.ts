import type {
  Measurements,
  Ethnicity,
  Diagnosis,
  BmiLabel,
  DiagnosisResult
} from './types';
import { getThresholds } from './thresholds';

const DISCLAIMER =
  '本工具仅作参考，不构成医疗建议。如有疑虑，请咨询专业医生。';

const RECOMMENDATIONS: Record<Diagnosis, string> = {
  underweight:
    '关注营养摄入，必要时咨询医生评估是否存在吸收或代谢问题。',
  normal: '维持健康饮食与规律活动即可。',
  overweight:
    '调整饮食结构（减少精制碳水、增加蛋白质与膳食纤维），增加日常活动量，并定期监测。',
  obese:
    '建议前往医院体重门诊或内分泌科，结合血糖、血脂、肝功能等指标进行专业评估。'
};

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function bmiLabel(bmi: number, e: Ethnicity): BmiLabel {
  const t = getThresholds(e);
  if (bmi < 18.5) return '偏瘦';
  if (bmi < t.bmiOverweightMin) return '正常';
  if (bmi < t.bmiObeseMin) return '超重';
  return '肥胖';
}

export function diagnose(
  m: Measurements,
  e: Ethnicity = 'asian'
): DiagnosisResult {
  const t = getThresholds(e);
  const bmi = m.weight / Math.pow(m.height / 100, 2);
  const whtr = m.waist / m.height;
  const waistTh = t.waistDefault;

  let category: Diagnosis;
  const triggers: string[] = [];

  if (bmi < 18.5) {
    category = 'underweight';
    triggers.push(`BMI ${round1(bmi)} < 18.5`);
  } else if (bmi < t.bmiOverweightMin) {
    category = 'normal';
    triggers.push(`BMI ${round1(bmi)} 处于正常范围`);
  } else if (bmi < t.bmiObeseMin) {
    if (whtr >= t.whtr || m.waist >= waistTh) {
      category = 'obese';
      triggers.push(`BMI ${round1(bmi)} 处于超重范围`);
      if (whtr >= t.whtr) {
        triggers.push(`腰高比 ${round2(whtr)} ≥ ${t.whtr}`);
      }
      if (m.waist >= waistTh) {
        triggers.push(`腰围 ${m.waist}cm ≥ ${waistTh}cm`);
      }
    } else {
      category = 'overweight';
      triggers.push(`BMI ${round1(bmi)} 处于超重范围`);
    }
  } else {
    category = 'obese';
    triggers.push(`BMI ${round1(bmi)} ≥ ${t.bmiObeseMin}`);
  }

  return {
    category,
    metrics: {
      bmi: round1(bmi),
      whtr: round2(whtr),
      bmiLabel: bmiLabel(bmi, e),
      whtrLabel: whtr >= t.whtr ? '超标' : '正常',
      waistLabel: m.waist >= waistTh ? '超标' : '正常',
      waistThresholdUsed: waistTh,
      waistMale: t.waistMale
    },
    triggers,
    recommendation: RECOMMENDATIONS[category],
    disclaimer: DISCLAIMER
  };
}
