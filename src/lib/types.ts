export type Ethnicity = 'asian' | 'non-asian';

export type Diagnosis = 'underweight' | 'normal' | 'overweight' | 'obese';

export type BmiLabel = '偏瘦' | '正常' | '超重' | '肥胖';

export interface Measurements {
  height: number; // cm
  weight: number; // kg
  waist: number;  // cm
}

export interface Thresholds {
  /** BMI 切点：超重下限（含） */
  bmiOverweightMin: number;
  /** BMI 切点：肥胖下限（含） */
  bmiObeseMin: number;
  /** 默认（无性别输入时）腰围阈值，采用较严值 */
  waistDefault: number;
  /** 男性腰围阈值 */
  waistMale: number;
  /** WHtR 阈值 */
  whtr: number;
}

export interface DiagnosisMetrics {
  bmi: number;
  whtr: number;
  bmiLabel: BmiLabel;
  whtrLabel: '正常' | '超标';
  waistLabel: '正常' | '超标';
  waistThresholdUsed: number;
  waistMale: number;
}

export interface DiagnosisResult {
  category: Diagnosis;
  metrics: DiagnosisMetrics;
  triggers: string[];
  recommendation: string;
  disclaimer: string;
}
