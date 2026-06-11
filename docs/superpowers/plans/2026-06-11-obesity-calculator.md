# 2026 肥胖评估工具 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个 Svelte 5 + Vite 静态站点，让用户在 3 个字段（身高 / 体重 / 腰围）内完成 2026 ADA 新标准下的"是否肥胖"自我评估，并提供一份标准解读长文页，部署到 GitHub Pages。

**Architecture:** 纯前端 SPA，hash 路由（Svelte SPA Router），核心诊断逻辑是纯函数 + 常量；输入用全局 Svelte store 跨页面传递；测试用 Vitest + @testing-library/svelte。

**Tech Stack:** Svelte 5, TypeScript, Vite 5, svelte-spa-router 4, Vitest 2, @testing-library/svelte 5, happy-dom, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-06-11-obesity-calculator-design.md`

---

## 文件结构总览

```
obesity-calculator/
├── index.html                        # 入口 HTML
├── package.json                      # 依赖与脚本
├── tsconfig.json                     # TS 配置
├── svelte.config.js                  # Svelte 预处理配置
├── vite.config.ts                    # Vite + Vitest 配置
├── .gitignore                        # 忽略 node_modules / dist
├── .github/workflows/deploy.yml      # CI: 测 + 部署
├── README.md                         # 项目说明（更新）
└── src/
    ├── main.ts                       # 启动入口
    ├── app.css                       # 设计 token + 全局样式
    ├── App.svelte                    # 路由根
    ├── test-setup.ts                 # 测试环境（jest-dom 匹配器）
    ├── lib/
    │   ├── types.ts                  # 共享类型
    │   ├── thresholds.ts             # 阈值常量
    │   ├── thresholds.test.ts        # 阈值测试
    │   ├── diagnose.ts               # 诊断纯函数
    │   ├── diagnose.test.ts          # 诊断测试
    │   ├── store.ts                  # 测算输入 store
    │   ├── store.test.ts             # store 测试
    │   └── components/
    │       ├── InputField.svelte
    │       ├── InputField.test.ts
    │       ├── MetricBar.svelte
    │       ├── ResultCard.svelte
    │       ├── ResultCard.test.ts
    │       ├── Disclaimer.svelte
    │       └── Disclaimer.test.ts
    └── routes/
        ├── Home.svelte               # 测算首页
        ├── Result.svelte             # 结果页
        └── Guide.svelte              # 解读长文页
```

---

## 任务列表

- [ ] **Task 1: 项目骨架（package.json、tsconfig、vite、gitignore）**
- [ ] **Task 2: 安装依赖并验证构建工具链**
- [ ] **Task 3: 类型定义（types.ts）**
- [ ] **Task 4: 阈值常量（thresholds.ts + tests）**
- [ ] **Task 5: 诊断函数（diagnose.ts + tests）**
- [ ] **Task 6: 全局 store（store.ts + tests）**
- [ ] **Task 7: InputField 组件**
- [ ] **Task 8: MetricBar 组件**
- [ ] **Task 9: Disclaimer 组件**
- [ ] **Task 10: ResultCard 组件**
- [ ] **Task 11: 测算首页（Home.svelte）**
- [ ] **Task 12: 结果页（Result.svelte）**
- [ ] **Task 13: 解读页（Guide.svelte）**
- [ ] **Task 14: 路由根（App.svelte + main.ts）**
- [ ] **Task 15: 设计 token 与全局样式（app.css）**
- [ ] **Task 16: 入口 HTML（index.html）**
- [ ] **Task 17: GitHub Actions 部署工作流**
- [ ] **Task 18: README 与手动验证**

---

## Task 1: 项目骨架

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `svelte.config.js`
- Create: `vite.config.ts`
- Create: `.gitignore`
- Create: `src/main.ts`（空启动）
- Create: `src/test-setup.ts`
- Create: `src/app.css`（最小占位）
- Create: `src/App.svelte`（最小占位）

- [ ] **Step 1: 创建 `package.json`**

写入 `/home/cooper/githubProjects/obesity-calculator/package.json`：

```json
{
  "name": "obesity-calculator",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "description": "基于 2026 ADA 新指南的肥胖评估工具",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@tsconfig/svelte": "^5.0.0",
    "@testing-library/svelte": "^5.2.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/node": "^20.0.0",
    "happy-dom": "^15.0.0",
    "svelte": "^5.0.0",
    "svelte-check": "^4.0.0",
    "tslib": "^2.6.0",
    "typescript": "^5.4.0",
    "vite": "^5.4.0",
    "vitest": "^2.0.0"
  },
  "dependencies": {
    "svelte-spa-router": "^4.0.1"
  }
}
```

- [ ] **Step 2: 创建 `tsconfig.json`**

写入 `/home/cooper/githubProjects/obesity-calculator/tsconfig.json`：

```json
{
  "extends": "@tsconfig/svelte",
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "isolatedModules": true,
    "moduleDetection": "force",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.svelte"]
}
```

- [ ] **Step 3: 创建 `svelte.config.js`**

写入 `/home/cooper/githubProjects/obesity-calculator/svelte.config.js`：

```js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess()
};
```

- [ ] **Step 4: 创建 `vite.config.ts`**

写入 `/home/cooper/githubProjects/obesity-calculator/vite.config.ts`：

```ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: './',
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,svelte}']
  }
});
```

- [ ] **Step 5: 创建 `.gitignore`**

写入 `/home/cooper/githubProjects/obesity-calculator/.gitignore`：

```
node_modules
dist
.svelte-kit
.DS_Store
*.log
coverage
.vite
```

- [ ] **Step 6: 创建占位 `src/main.ts`**

写入 `/home/cooper/githubProjects/obesity-calculator/src/main.ts`：

```ts
import { mount } from 'svelte';
import App from './App.svelte';
import './app.css';

const app = mount(App, { target: document.getElementById('app')! });

export default app;
```

- [ ] **Step 7: 创建占位 `src/test-setup.ts`**

写入 `/home/cooper/githubProjects/obesity-calculator/src/test-setup.ts`：

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 8: 创建占位 `src/app.css`**

写入 `/home/cooper/githubProjects/obesity-calculator/src/app.css`：

```css
/* 占位，全局样式见 Task 15 */
```

- [ ] **Step 9: 创建占位 `src/App.svelte`**

写入 `/home/cooper/githubProjects/obesity-calculator/src/App.svelte`：

```svelte
<script lang="ts">
  // 占位，路由见 Task 14
</script>

<main>占位</main>
```

- [ ] **Step 10: 提交**

```bash
git add package.json tsconfig.json svelte.config.js vite.config.ts .gitignore src/
git commit -m "chore: scaffold Svelte 5 + Vite + Vitest project"
```

---

## Task 2: 安装依赖并验证工具链

**Files:** （无新增）

- [ ] **Step 1: 安装依赖**

```bash
cd /home/cooper/githubProjects/obesity-calculator
npm install
```

Expected: 安装成功，无 ERR。`node_modules` 目录生成但被 `.gitignore` 忽略。

- [ ] **Step 2: 验证 Vitest 能跑**

```bash
npm test
```

Expected: 没有测试文件，输出 `No test files found`，退出码 0（vitest 找不到文件时不会报错，只是不跑）。如果默认退出码非 0，可临时添加 `--passWithNoTests`。

- [ ] **Step 3: 验证 Vite 构建能跑**

```bash
npm run build
```

Expected: 成功生成 `dist/index.html` 与 `dist/assets/*.js`，无报错。

- [ ] **Step 4: 验证类型检查能跑**

```bash
npm run check
```

Expected: 输出 `0 errors, 0 warnings` 或类似空结果。

- [ ] **Step 5: 提交（如果有 lockfile）**

```bash
git add package-lock.json
git commit -m "chore: pin dependencies in lockfile"
```

如果 npm 默认不生成 lockfile，跳过此步。

---

## Task 3: 类型定义

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: 写入类型文件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/types.ts`：

```ts
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
}

export interface DiagnosisResult {
  category: Diagnosis;
  metrics: DiagnosisMetrics;
  triggers: string[];
  recommendation: string;
  disclaimer: string;
}
```

- [ ] **Step 2: 类型检查**

```bash
npm run check
```

Expected: 0 errors。

- [ ] **Step 3: 提交**

```bash
git add src/lib/types.ts
git commit -m "feat: add shared types for diagnosis"
```

---

## Task 4: 阈值常量

**Files:**
- Create: `src/lib/thresholds.ts`
- Create: `src/lib/thresholds.test.ts`

- [ ] **Step 1: 写失败测试**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/thresholds.test.ts`：

```ts
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
```

- [ ] **Step 2: 跑测试，确认失败**

```bash
npm test -- src/lib/thresholds.test.ts
```

Expected: FAIL，`Cannot find module './thresholds'` 或 `THRESHOLDS is not defined`。

- [ ] **Step 3: 写实现**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/thresholds.ts`：

```ts
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
```

- [ ] **Step 4: 跑测试，确认通过**

```bash
npm test -- src/lib/thresholds.test.ts
```

Expected: 所有测试 PASS。

- [ ] **Step 5: 提交**

```bash
git add src/lib/thresholds.ts src/lib/thresholds.test.ts
git commit -m "feat: add thresholds constants for asian and non-asian standards"
```

---

## Task 5: 诊断函数

**Files:**
- Create: `src/lib/diagnose.ts`
- Create: `src/lib/diagnose.test.ts`

- [ ] **Step 1: 写失败测试**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/diagnose.test.ts`：

```ts
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
    // height 170, weight 79.465 → BMI 27.5
    const r = diagnose({ height: 170, weight: 79.465, waist: 75 });
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
    const r = diagnose({ height: 170, weight: 70, waist: 80 }, 'non-asian');
    // WHtR 0.47, waist 80 < 88 → 超重
    expect(r.category).toBe('overweight');
    expect(r.metrics.waistThresholdUsed).toBe(88);
  });

  it('非亚裔 BMI 25 + 腰围 88 触发肥胖', () => {
    // height 170, weight 75, waist 88 → BMI 26, WHtR 0.518
    const r = diagnose({ height: 170, weight: 75, waist: 88 }, 'non-asian');
    expect(r.category).toBe('obese');
  });
});
```

- [ ] **Step 2: 跑测试，确认失败**

```bash
npm test -- src/lib/diagnose.test.ts
```

Expected: FAIL，`Cannot find module './diagnose'`。

- [ ] **Step 3: 写实现**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/diagnose.ts`：

```ts
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
      waistThresholdUsed: waistTh
    },
    triggers,
    recommendation: RECOMMENDATIONS[category],
    disclaimer: DISCLAIMER
  };
}
```

- [ ] **Step 4: 跑测试，确认通过**

```bash
npm test -- src/lib/diagnose.test.ts
```

Expected: 所有测试 PASS。如果边界测试不通过，回到实现调整 bmi 比较运算符。

- [ ] **Step 5: 跑全部测试，确认无回归**

```bash
npm test
```

Expected: thresholds + diagnose 测试全 PASS。

- [ ] **Step 6: 提交**

```bash
git add src/lib/diagnose.ts src/lib/diagnose.test.ts
git commit -m "feat: implement core diagnosis function with full test coverage"
```

---

## Task 6: 全局 store

**Files:**
- Create: `src/lib/store.ts`
- Create: `src/lib/store.test.ts`

- [ ] **Step 1: 写失败测试**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/store.test.ts`：

```ts
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
```

- [ ] **Step 2: 跑测试，确认失败**

```bash
npm test -- src/lib/store.test.ts
```

Expected: FAIL。

- [ ] **Step 3: 写实现**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/store.ts`：

```ts
import { writable } from 'svelte/store';
import type { Measurements, Ethnicity } from './types';

export const measurements = writable<Measurements | null>(null);
export const ethnicity = writable<Ethnicity>('asian');

export function setEthnicity(e: Ethnicity): void {
  ethnicity.set(e);
}

export function reset(): void {
  measurements.set(null);
}
```

- [ ] **Step 4: 跑测试，确认通过**

```bash
npm test -- src/lib/store.test.ts
```

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add src/lib/store.ts src/lib/store.test.ts
git commit -m "feat: add global stores for measurements and ethnicity"
```

---

## Task 7: InputField 组件

**Files:**
- Create: `src/lib/components/InputField.svelte`
- Create: `src/lib/components/InputField.test.ts`

- [ ] **Step 1: 写失败测试**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/InputField.test.ts`：

```ts
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

  it('值变更时触发 input 事件', async () => {
    const user = userEvent.setup();
    let captured: number | null = null;
    render(InputField, {
      props: {
        label: '身高',
        unit: 'cm',
        value: null,
        min: 100,
        max: 250,
        step: 0.1
      }
    }).component.$on('change', (e: CustomEvent<number | null>) => {
      captured = e.detail;
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
```

- [ ] **Step 2: 跑测试，确认失败**

```bash
npm test -- src/lib/components/InputField.test.ts
```

Expected: FAIL。

- [ ] **Step 3: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/InputField.svelte`：

```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface Props {
    label: string;
    unit: string;
    value: number | null;
    min: number;
    max: number;
    step?: number;
  }

  let { label, unit, value = $bindable(null), min, max, step = 1 }: Props = $props();

  const dispatch = createEventDispatcher<{ change: number | null }>();

  let raw = $state(value === null ? '' : String(value));

  $effect(() => {
    raw = value === null ? '' : String(value);
  });

  function isValid(n: number): boolean {
    return n >= min && n <= max;
  }

  function handleInput(e: Event) {
    const t = e.target as HTMLInputElement;
    raw = t.value;
    if (t.value === '') {
      value = null;
      dispatch('change', null);
      return;
    }
    const n = Number(t.value);
    if (!Number.isFinite(n)) {
      value = null;
      dispatch('change', null);
      return;
    }
    value = n;
    dispatch('change', n);
  }

  let numericValue = $derived(raw === '' ? null : Number(raw));
  let valid = $derived(numericValue === null || isValid(numericValue));
  let errorText = $derived(
    numericValue === null || isValid(numericValue)
      ? ''
      : `请输入 ${min} ~ ${max} ${unit}`
  );
</script>

<label class="field">
  <span class="label">{label}</span>
  <span class="input-wrap">
    <input
      type="number"
      inputmode="decimal"
      {min}
      {max}
      {step}
      value={raw}
      oninput={handleInput}
      aria-label={label}
      aria-invalid={!valid}
    />
    <span class="unit">{unit}</span>
  </span>
  {#if errorText}
    <span class="error" role="alert">{errorText}</span>
  {/if}
</label>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .label {
    font-size: 0.95rem;
    color: var(--fg-muted);
    font-weight: 500;
  }
  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: 0.625rem;
    padding: 0.25rem 0.75rem;
  }
  .input-wrap:focus-within {
    border-color: var(--accent);
  }
  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.75rem 0;
    font-size: 1.125rem;
    font-family: inherit;
    color: var(--fg);
    outline: none;
    min-width: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  .unit {
    margin-left: 0.5rem;
    color: var(--fg-muted);
    font-size: 0.95rem;
  }
  .error {
    font-size: 0.85rem;
    color: var(--accent-coral);
  }
</style>
```

- [ ] **Step 4: 跑测试，确认通过**

```bash
npm test -- src/lib/components/InputField.test.ts
```

Expected: PASS。如果 `$on` 触发器有问题，回看测试是否使用正确的 `$on` API（Svelte 5 推荐 callback prop，但保留 `$on` 也可工作）。

- [ ] **Step 5: 提交**

```bash
git add src/lib/components/InputField.svelte src/lib/components/InputField.test.ts
git commit -m "feat: add InputField component with validation and error display"
```

---

## Task 8: MetricBar 组件

**Files:**
- Create: `src/lib/components/MetricBar.svelte`

无单独测试（被 ResultCard 测试覆盖）。

- [ ] **Step 1: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/MetricBar.svelte`：

```svelte
<script lang="ts">
  interface Props {
    name: string;
    value: string;
    status: '正常' | '超标' | '超重' | '肥胖' | '偏瘦';
    sublabel?: string;
  }

  let { name, value, status, sublabel = '' }: Props = $props();

  let statusClass = $derived(status === '正常' ? 'ok' : 'warn');
</script>

<div class="metric {statusClass}">
  <div class="name">{name}</div>
  <div class="value">{value}</div>
  <div class="status">{status}{sublabel}</div>
</div>

<style>
  .metric {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    background: var(--surface-1);
    border-radius: 0.75rem;
    border: 1px solid var(--border);
  }
  .metric.ok {
    border-color: var(--border);
  }
  .metric.warn {
    border-color: var(--accent-amber);
    background: var(--surface-warn);
  }
  .name {
    font-size: 0.85rem;
    color: var(--fg-muted);
  }
  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--fg);
    font-variant-numeric: tabular-nums;
  }
  .status {
    font-size: 0.85rem;
  }
  .metric.ok .status {
    color: var(--accent-green);
  }
  .metric.warn .status {
    color: var(--accent-amber);
  }
</style>
```

- [ ] **Step 2: 验证编译**

```bash
npm run check
```

Expected: 0 errors。

- [ ] **Step 3: 提交**

```bash
git add src/lib/components/MetricBar.svelte
git commit -m "feat: add MetricBar component for result page metrics"
```

---

## Task 9: Disclaimer 组件

**Files:**
- Create: `src/lib/components/Disclaimer.svelte`
- Create: `src/lib/components/Disclaimer.test.ts`

- [ ] **Step 1: 写失败测试**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/Disclaimer.test.ts`：

```ts
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
```

- [ ] **Step 2: 跑测试，确认失败**

```bash
npm test -- src/lib/components/Disclaimer.test.ts
```

Expected: FAIL。

- [ ] **Step 3: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/Disclaimer.svelte`：

```svelte
<script lang="ts">
  interface Props {
    text: string;
  }
  let { text }: Props = $props();
</script>

<aside class="disclaimer" role="alert" aria-label="医疗免责声明">
  <span class="icon" aria-hidden="true">⚠</span>
  <span>{text}</span>
</aside>

<style>
  .disclaimer {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0.875rem 1rem;
    background: var(--surface-warn);
    border-radius: 0.625rem;
    font-size: 0.85rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }
  .icon {
    color: var(--accent-amber);
    flex-shrink: 0;
  }
</style>
```

- [ ] **Step 4: 跑测试，确认通过**

```bash
npm test -- src/lib/components/Disclaimer.test.ts
```

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add src/lib/components/Disclaimer.svelte src/lib/components/Disclaimer.test.ts
git commit -m "feat: add Disclaimer component for medical notices"
```

---

## Task 10: ResultCard 组件

**Files:**
- Create: `src/lib/components/ResultCard.svelte`
- Create: `src/lib/components/ResultCard.test.ts`

- [ ] **Step 1: 写失败测试**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/ResultCard.test.ts`：

```ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ResultCard from './ResultCard.svelte';
import type { DiagnosisResult } from '../types';

const mockObese: DiagnosisResult = {
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

describe('ResultCard', () => {
  it('显示分类中文大标题', () => {
    render(ResultCard, { props: { result: mockObese } });
    expect(screen.getByText('肥胖')).toBeInTheDocument();
  });

  it('显示 BMI / WHtR / 腰围三个指标', () => {
    render(ResultCard, { props: { result: mockObese } });
    expect(screen.getByText('25.4')).toBeInTheDocument();
    expect(screen.getByText('0.51')).toBeInTheDocument();
    expect(screen.getByText('82')).toBeInTheDocument(); // 腰围
  });

  it('显示触发条件列表', () => {
    render(ResultCard, { props: { result: mockObese } });
    expect(screen.getByText('BMI 25.4 处于超重范围')).toBeInTheDocument();
    expect(screen.getByText('腰高比 0.51 ≥ 0.5')).toBeInTheDocument();
  });

  it('显示建议文案', () => {
    render(ResultCard, { props: { result: mockObese } });
    expect(screen.getByText('建议前往医院。')).toBeInTheDocument();
  });

  it('显示腰围阈值提示', () => {
    render(ResultCard, { props: { result: mockObese } });
    expect(screen.getByText(/女性标准/)).toBeInTheDocument();
  });
});
```

注意：测试中腰围 82 来自 mockObese.triggers 但我们也要在 metrics 中显示它。需要在 ResultCard 里接收一个 `waist` 数字参数（不在 `result` 内的字段）。我会在组件里把 waist 单独提出来作为 prop。

- [ ] **Step 2: 调整测试文件，加入 waist 字段**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/ResultCard.test.ts`（覆盖 Step 1）：

```ts
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
```

- [ ] **Step 3: 跑测试，确认失败**

```bash
npm test -- src/lib/components/ResultCard.test.ts
```

Expected: FAIL。

- [ ] **Step 4: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/lib/components/ResultCard.svelte`：

```svelte
<script lang="ts">
  import type { DiagnosisResult, Diagnosis } from '../types';
  import MetricBar from './MetricBar.svelte';

  interface Props {
    result: DiagnosisResult;
    waist: number;
  }

  let { result, waist }: Props = $props();

  const CATEGORY_TEXT: Record<Diagnosis, { title: string; subtitle: string }> = {
    underweight: { title: '偏瘦', subtitle: '关注营养' },
    normal: { title: '正常', subtitle: '维持现状' },
    overweight: { title: '超重', subtitle: '建议关注' },
    obese: { title: '肥胖', subtitle: '建议就医评估' }
  };
</script>

<section class="result" data-category={result.category}>
  <header class="hero">
    <p class="eyebrow">你的评估结果</p>
    <h1 class="title">{CATEGORY_TEXT[result.category].title}</h1>
    <p class="subtitle">{CATEGORY_TEXT[result.category].subtitle}</p>
  </header>

  <section class="metrics" aria-label="关键指标">
    <h2 class="section-title">关键指标</h2>
    <div class="grid">
      <MetricBar name="BMI" value={String(result.metrics.bmi)} status={result.metrics.bmiLabel} />
      <MetricBar name="腰高比" value={String(result.metrics.whtr)} status={result.metrics.whtrLabel} />
      <MetricBar name="腰围" value={`${waist} cm`} status={result.metrics.waistLabel} sublabel={` (阈值 ${result.metrics.waistThresholdUsed}cm)`} />
    </div>
  </section>

  <section class="triggers" aria-label="判定依据">
    <h2 class="section-title">判定依据</h2>
    <ul>
      {#each result.triggers as t}
        <li>{t}</li>
      {/each}
    </ul>
  </section>

  <section class="rec" aria-label="建议">
    <h2 class="section-title">建议</h2>
    <p>{result.recommendation}</p>
  </section>

  <p class="waist-note">
    腰围采用女性标准 ({result.metrics.waistThresholdUsed}cm)；男性实际阈值为 {result.metrics.waistThresholdUsed + 10}cm
  </p>
</section>

<style>
  .result {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .hero {
    text-align: center;
    padding: 2rem 1rem;
    border-radius: 1rem;
    background: var(--hero-bg);
  }
  .result[data-category='underweight'] .hero {
    background: var(--hero-muted);
  }
  .result[data-category='normal'] .hero {
    background: var(--hero-ok);
  }
  .result[data-category='overweight'] .hero {
    background: var(--hero-warn);
  }
  .result[data-category='obese'] .hero {
    background: var(--hero-danger);
  }
  .eyebrow {
    font-size: 0.85rem;
    color: var(--fg-muted);
    margin: 0 0 0.5rem;
  }
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: var(--fg);
    letter-spacing: 0.1em;
  }
  .subtitle {
    font-size: 0.95rem;
    color: var(--fg-muted);
    margin: 0;
  }
  .section-title {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .grid > :global(.metric:last-child) {
    grid-column: 1 / -1;
  }
  .triggers ul {
    margin: 0;
    padding-left: 1.25rem;
    color: var(--fg);
    line-height: 1.8;
  }
  .rec p {
    margin: 0;
    color: var(--fg);
    line-height: 1.6;
  }
  .waist-note {
    font-size: 0.8rem;
    color: var(--fg-muted);
    margin: 0;
  }
</style>
```

- [ ] **Step 5: 跑测试，确认通过**

```bash
npm test -- src/lib/components/ResultCard.test.ts
```

Expected: PASS。

- [ ] **Step 6: 提交**

```bash
git add src/lib/components/ResultCard.svelte src/lib/components/ResultCard.test.ts
git commit -m "feat: add ResultCard component composing metrics, triggers, recommendation"
```

---

## Task 11: 测算首页（Home.svelte）

**Files:**
- Create: `src/routes/Home.svelte`

无单独测试（在浏览器手动验证 + e2e 任务覆盖）。

- [ ] **Step 1: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/routes/Home.svelte`：

```svelte
<script lang="ts">
  import InputField from '../lib/components/InputField.svelte';
  import { measurements, ethnicity, setEthnicity } from '../lib/store';
  import { diagnose } from '../lib/diagnose';
  import { push } from 'svelte-spa-router';
  import type { Ethnicity, Measurements } from '../lib/types';

  let height = $state<number | null>(null);
  let weight = $state<number | null>(null);
  let waist = $state<number | null>(null);

  let waistHintOpen = $state(false);
  let ethnicityOpen = $state(false);

  let currentEthnicity = $derived($ethnicity);

  let heightValid = $derived(height !== null && height >= 100 && height <= 250);
  let weightValid = $derived(weight !== null && weight >= 20 && weight <= 300);
  let waistValid = $derived(waist !== null && waist >= 40 && waist <= 200);
  let allValid = $derived(heightValid && weightValid && waistValid);

  function onCalculate() {
    if (!allValid || height === null || weight === null || waist === null) return;
    const m: Measurements = { height, weight, waist };
    measurements.set(m);
    // 触发计算以让 Result 页面拿到结果
    diagnose(m, currentEthnicity);
    push('/result');
  }

  function onEthnicityChange(e: Event) {
    const v = (e.target as HTMLSelectElement).value as Ethnicity;
    setEthnicity(v);
    ethnicityOpen = false;
  }
</script>

<div class="home">
  <header class="page-head">
    <h1>2026 肥胖评估</h1>
    <p class="lead">基于 ADA 最新指南</p>
  </header>

  <form
    class="form"
    onsubmit={(e) => {
      e.preventDefault();
      onCalculate();
    }}
  >
    <InputField label="身高" unit="cm" bind:value={height} min={100} max={250} step={0.1} />
    <InputField label="体重" unit="kg" bind:value={weight} min={20} max={300} step={0.1} />
    <InputField label="腰围" unit="cm" bind:value={waist} min={40} max={200} step={0.1} />

    <button class="primary" type="submit" disabled={!allValid}>
      开始测算
    </button>
  </form>

  <details class="hint" bind:open={waistHintOpen}>
    <summary>不知道腰围怎么量？</summary>
    <ol>
      <li>用软尺</li>
      <li>在肚脐水平线（腰部最细处下方）绕一圈</li>
      <li>呼气末、吸气开始时测量，不要憋气</li>
      <li>保持尺子水平，紧贴皮肤，不要勒紧</li>
    </ol>
  </details>

  <div class="ethnicity">
    {#if !ethnicityOpen}
      <button class="link" type="button" onclick={() => (ethnicityOpen = true)}>
        非亚裔？切换人群 →
      </button>
    {:else}
      <label class="ethnicity-pick">
        <span>人群：</span>
        <select onchange={onEthnicityChange} value={currentEthnicity}>
          <option value="asian">亚裔（默认）</option>
          <option value="non-asian">非亚裔</option>
        </select>
      </label>
    {/if}
  </div>

  <a class="link guide-link" href="#/guide">了解 2026 新标准 →</a>
</div>

<style>
  .home {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .page-head {
    text-align: center;
  }
  .page-head h1 {
    font-size: 1.5rem;
    margin: 0 0 0.25rem;
    color: var(--fg);
  }
  .lead {
    margin: 0;
    color: var(--fg-muted);
    font-size: 0.95rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .primary {
    margin-top: 0.5rem;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 0.625rem;
    background: var(--accent);
    color: var(--accent-fg);
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .hint {
    background: var(--surface-1);
    border-radius: 0.625rem;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: var(--fg-muted);
  }
  .hint summary {
    cursor: pointer;
    color: var(--fg);
  }
  .hint ol {
    margin: 0.75rem 0 0;
    padding-left: 1.25rem;
    line-height: 1.7;
  }
  .link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    display: block;
  }
  .guide-link {
    margin-top: 0.5rem;
  }
  .ethnicity-pick {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--fg-muted);
  }
  .ethnicity-pick select {
    padding: 0.4rem 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid var(--border);
    background: var(--surface-1);
    color: var(--fg);
    font-family: inherit;
  }
</style>
```

- [ ] **Step 2: 验证编译**

```bash
npm run check
```

Expected: 0 errors。如果 Svelte 5 的 `bind:` 在 InputField 上不工作，把 `bind:value` 改为 `value={height} onchange={...}` 手动更新。

- [ ] **Step 3: 提交**

```bash
git add src/routes/Home.svelte
git commit -m "feat: add home page with input form and ethnicity toggle"
```

---

## Task 12: 结果页（Result.svelte）

**Files:**
- Create: `src/routes/Result.svelte`

- [ ] **Step 1: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/routes/Result.svelte`：

> **简化说明**：spec 13 节要求空 store 跳回首页时附 toast "请先完成测算"，v1 实现为静默跳转（如需 toast 可后续扩展）。

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { measurements, ethnicity, reset } from '../lib/store';
  import { diagnose } from '../lib/diagnose';
  import ResultCard from '../lib/components/ResultCard.svelte';
  import Disclaimer from '../lib/components/Disclaimer.svelte';
  import type { DiagnosisResult } from '../lib/types';

  let result = $state<DiagnosisResult | null>(null);
  let waist = $state<number | null>(null);

  onMount(() => {
    const m = $measurements;
    if (!m) {
      push('/');
      return;
    }
    const e = $ethnicity;
    result = diagnose(m, e);
    waist = m.waist;
  });

  function onReset() {
    reset();
    push('/');
  }
</script>

<div class="result-page">
  <nav class="bar">
    <button class="link" type="button" onclick={() => push('/')}>← 返回</button>
    <button class="link" type="button" onclick={onReset}>重新测量</button>
  </nav>

  {#if result && waist !== null}
    <ResultCard {result} {waist} />
    <Disclaimer text={result.disclaimer} />
    <a class="guide-link" href="#/guide">了解 2026 新标准 →</a>
  {:else}
    <p class="loading">正在加载...</p>
  {/if}
</div>

<style>
  .result-page {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .bar {
    display: flex;
    justify-content: space-between;
  }
  .link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0;
    font-family: inherit;
  }
  .loading {
    text-align: center;
    color: var(--fg-muted);
  }
  .guide-link {
    color: var(--accent);
    text-decoration: none;
    text-align: center;
    font-size: 0.9rem;
  }
</style>
```

- [ ] **Step 2: 验证编译**

```bash
npm run check
```

Expected: 0 errors。

- [ ] **Step 3: 提交**

```bash
git add src/routes/Result.svelte
git commit -m "feat: add result page with diagnosis, disclaimer and re-measure action"
```

---

## Task 13: 解读页（Guide.svelte）

**Files:**
- Create: `src/routes/Guide.svelte`

- [ ] **Step 1: 写组件**

写入 `/home/cooper/githubProjects/obesity-calculator/src/routes/Guide.svelte`：

```svelte
<script lang="ts">
  import { push } from 'svelte-spa-router';
</script>

<article class="guide">
  <nav class="bar">
    <button class="link" type="button" onclick={() => push('/')}>← 返回测算</button>
  </nav>

  <header>
    <h1>2026 肥胖评估新标准解读</h1>
    <p class="lead">美国糖尿病协会 (ADA) / 《柳叶刀》临床肥胖症新框架</p>
  </header>

  <section>
    <h2>核心变化：从"唯 BMI"到"多维评估"</h2>
    <p>
      2026 年肥胖诊断标准的颠覆性调整，核心在于将 BMI 从"诊断标准"降级为"筛查指标"。
      旧逻辑是"BMI 达到一定数值 = 肥胖"，新逻辑要求结合脂肪量与脂肪分布综合判断，
      尤其是中心性 / 内脏性脂肪堆积——这是危害最大的类型。
    </p>
    <p>
      新指南采用"二选一"诊断逻辑：满足以下任一即可诊断为肥胖——
    </p>
    <ul>
      <li>BMI 达到相应人种的肥胖标准；或</li>
      <li>BMI 处于超重范围，但腰围（WC）或腰高比（WHtR）超标</li>
    </ul>
  </section>

  <section>
    <h2>亚裔切点更严格</h2>
    <p>亚裔在较低 BMI 下内脏脂肪风险更高，因此新标准为亚裔单独设定更低的切点：</p>
    <table>
      <thead>
        <tr><th>人群</th><th>超重（BMI）</th><th>肥胖（BMI）</th></tr>
      </thead>
      <tbody>
        <tr><td>亚裔（新标准）</td><td>≥ 23</td><td>≥ 27.5</td></tr>
        <tr><td>中国（当前标准）</td><td>24 ~ 27.9</td><td>≥ 28</td></tr>
        <tr><td>非亚裔（新标准）</td><td>≥ 25</td><td>≥ 30</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>腰围与腰高比（WHtR）</h2>
    <p>这是"看脂肪分布"的关键指标：</p>
    <ul>
      <li>腰围超标：亚裔女 ≥ 80cm / 男 ≥ 90cm；非亚裔女 ≥ 88cm / 男 ≥ 102cm</li>
      <li>腰高比超标：腰围 ÷ 身高 ≥ 0.5（不分种族、不分性别）</li>
    </ul>
    <p>
      腰高比的优势在于"标准化"——一个 1.6m 的人腰围不应超过 80cm；
      一个 1.75m 的人腰围不应超过 87.5cm。
    </p>
    <h3>测量方法</h3>
    <ul>
      <li>用软尺，在肚脐水平线绕一圈</li>
      <li>呼气末、吸气开始时测量，不要憋气</li>
      <li>保持尺子水平，紧贴皮肤</li>
    </ul>
  </section>

  <section>
    <h2>临床前肥胖 vs 临床肥胖</h2>
    <p>新指南的另一大更新是风险分层：</p>
    <ul>
      <li>
        <strong>临床前肥胖</strong>：体脂超标，但器官功能正常。需要生活方式干预以防进展。
      </li>
      <li>
        <strong>临床肥胖</strong>：体脂超标已导致器官功能受损（如高血压、睡眠呼吸暂停、骨关节炎、脂肪肝等）。
        应作为独立的慢性疾病积极治疗。
      </li>
    </ul>
  </section>

  <section>
    <h2>与中国现行标准对照</h2>
    <table>
      <thead>
        <tr><th>分类</th><th>BMI 范围</th><th>腰围相关标准</th></tr>
      </thead>
      <tbody>
        <tr><td>偏瘦</td><td>&lt; 18.5</td><td>—</td></tr>
        <tr><td>正常</td><td>18.5 ~ 23.9</td><td>—</td></tr>
        <tr><td>超重</td><td>24.0 ~ 27.9</td><td>男 ≥ 85cm / 女 ≥ 80cm 需警惕</td></tr>
        <tr><td>肥胖</td><td>≥ 28.0</td><td>男 ≥ 90cm / 女 ≥ 85cm 为中心性肥胖</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>行动建议</h2>
    <ol>
      <li>测量：身高 + 腰围（肚脐水平，呼气末）</li>
      <li>计算：腰高比 = 腰围 ÷ 身高（是否 ≥ 0.5？）；BMI = 体重 ÷ 身高²（是否 ≥ 23？）</li>
      <li>对照：BMI ≥ 23 或 腰高比 ≥ 0.5 或 腰围超标 → 高风险人群</li>
      <li>行动：调整饮食结构（减少精制碳水、增加蛋白质与膳食纤维），增加日常活动量，定期监测</li>
    </ol>
  </section>

  <footer>
    <h2>📖 参考资料</h2>
    <p>
      本页内容整理自 2025 年《柳叶刀》临床肥胖症定义新框架与 2026 年美国糖尿病协会（ADA）肥胖诊疗标准，
      以及公开发表的医学科普资料。内容仅作科普参考。
    </p>
    <p class="risk">⚠ 内容仅作科普参考，不构成医疗建议。如有疑虑，请前往医院体重门诊或内分泌科就诊。</p>
  </footer>
</article>

<style>
  .guide {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    line-height: 1.7;
  }
  .bar {
    display: flex;
  }
  .link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0;
    font-family: inherit;
  }
  header h1 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem;
    color: var(--fg);
  }
  .lead {
    color: var(--fg-muted);
    margin: 0;
  }
  h2 {
    font-size: 1.25rem;
    margin: 0 0 0.75rem;
    color: var(--fg);
  }
  h3 {
    font-size: 1rem;
    margin: 1rem 0 0.5rem;
    color: var(--fg);
  }
  p, ul, ol {
    color: var(--fg);
    margin: 0 0 0.75rem;
  }
  ul, ol {
    padding-left: 1.5rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75rem 0;
    font-size: 0.9rem;
  }
  th, td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border);
    text-align: left;
  }
  th {
    color: var(--fg-muted);
    font-weight: 500;
  }
  footer {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }
  .risk {
    color: var(--fg-muted);
    font-size: 0.9rem;
  }
</style>
```

- [ ] **Step 2: 验证编译**

```bash
npm run check
```

Expected: 0 errors。

- [ ] **Step 3: 提交**

```bash
git add src/routes/Guide.svelte
git commit -m "feat: add standards interpretation page with 2026 framework details"
```

---

## Task 14: 路由根（App.svelte + main.ts）

**Files:**
- Modify: `src/App.svelte`（覆盖占位）
- Create: `src/main.ts`（已存在，确认无误）

- [ ] **Step 1: 覆盖 `src/App.svelte`**

写入 `/home/cooper/githubProjects/obesity-calculator/src/App.svelte`：

```svelte
<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Result from './routes/Result.svelte';
  import Guide from './routes/Guide.svelte';

  const routes = {
    '/': Home,
    '/result': Result,
    '/guide': Guide,
    '*': Home
  };
</script>

<div class="app">
  <main>
    <Router {routes} />
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 3rem;
    flex: 1;
  }
  @media (min-width: 768px) {
    main {
      max-width: 640px;
      padding: 2.5rem 2rem 4rem;
    }
  }
</style>
```

- [ ] **Step 2: 验证编译**

```bash
npm run check
```

Expected: 0 errors。

- [ ] **Step 3: 启动 dev server 验证三个路由**

```bash
npm run dev -- --host
```

打开浏览器访问：
- `http://localhost:5173/` → 应看到测算首页
- `http://localhost:5173/#/result` → 直接访问会跳回首页（store 为空）
- `http://localhost:5173/#/guide` → 应看到解读长文

确认无误后 Ctrl+C 停止 dev server。

- [ ] **Step 4: 提交**

```bash
git add src/App.svelte
git commit -m "feat: wire up hash-based router for home, result, and guide pages"
```

---

## Task 15: 设计 token 与全局样式

**Files:**
- Modify: `src/app.css`（覆盖占位）

- [ ] **Step 1: 写入完整设计 token**

写入 `/home/cooper/githubProjects/obesity-calculator/src/app.css`：

```css
:root {
  /* 颜色 */
  --bg: #faf8f5;
  --surface-1: #ffffff;
  --surface-warn: #fff7ed;
  --border: #e5e0d8;

  --fg: #1f1d1a;
  --fg-muted: #6b6760;

  --accent: #c97b3f;
  --accent-fg: #ffffff;
  --accent-green: #4a8a5e;
  --accent-amber: #c97b3f;
  --accent-coral: #c45a4f;

  --hero-bg: #f5f0e8;
  --hero-muted: #efece7;
  --hero-ok: #e8f0e9;
  --hero-warn: #fcefd9;
  --hero-danger: #f9dfd9;

  /* 间距 / 圆角 */
  --r-sm: 0.4rem;
  --r-md: 0.625rem;
  --r-lg: 0.75rem;
  --r-xl: 1rem;

  /* 字体 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
  min-height: 100%;
}

body {
  min-height: 100vh;
}

button {
  font: inherit;
}

a {
  color: var(--accent);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1815;
    --surface-1: #252320;
    --surface-warn: #2d261d;
    --border: #3a3631;

    --fg: #f5f0e8;
    --fg-muted: #9a948a;

    --accent: #d68a52;
    --accent-fg: #1a1815;
    --accent-green: #6ba97e;
    --accent-amber: #d68a52;
    --accent-coral: #d5706a;

    --hero-bg: #252320;
    --hero-muted: #252320;
    --hero-ok: #1f2a21;
    --hero-warn: #2d261d;
    --hero-danger: #2d201e;
  }
}
```

- [ ] **Step 2: 验证编译**

```bash
npm run check
```

Expected: 0 errors。

- [ ] **Step 3: 视觉验证**

```bash
npm run dev -- --host
```

打开浏览器：
- 首页：浅米色背景、橘色主按钮
- 输入 170/65/82，点"开始测算" → 结果页应为琥珀色 hero
- 切到深色模式（OS 设置）→ 颜色应自动反转

确认无误后 Ctrl+C 停止。

- [ ] **Step 4: 提交**

```bash
git add src/app.css
git commit -m "feat: add design tokens and global styles with dark mode support"
```

---

## Task 16: 入口 HTML

**Files:**
- Create: `index.html`

- [ ] **Step 1: 写入 index.html**

写入 `/home/cooper/githubProjects/obesity-calculator/index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="description" content="基于 2026 ADA 最新指南的肥胖评估工具，通过 BMI、腰围和腰高比（WHtR）进行综合诊断。" />
    <meta name="theme-color" content="#faf8f5" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#1a1815" media="(prefers-color-scheme: dark)" />
    <title>2026 肥胖评估</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>⚖</text></svg>" />
    <noscript>
      <style>
        body { font-family: sans-serif; padding: 2rem; max-width: 32rem; margin: 0 auto; }
      </style>
    </noscript>
  </head>
  <body>
    <div id="app">
      <noscript>
        <p>本工具需要启用 JavaScript。请在浏览器中允许脚本后刷新页面。</p>
      </noscript>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 2: 验证构建**

```bash
npm run build
```

Expected: `dist/index.html` 生成，`dist/assets/*.js` 生成，无错误。

- [ ] **Step 3: 本地预览构建产物**

```bash
npm run preview -- --host
```

打开 `http://localhost:4173/`（或终端显示的端口）验证：
- 三个页面都正常加载
- 测算 → 结果 → 解读闭环可用
- 刷新结果页会跳回首页（store 持久化未实现，符合预期）

确认后 Ctrl+C 停止。

- [ ] **Step 4: 提交**

```bash
git add index.html
git commit -m "feat: add entry HTML with meta tags and noscript fallback"
```

---

## Task 17: GitHub Actions 部署工作流

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建工作流目录**

```bash
mkdir -p /home/cooper/githubProjects/obesity-calculator/.github/workflows
```

- [ ] **Step 2: 写入 deploy.yml**

写入 `/home/cooper/githubProjects/obesity-calculator/.github/workflows/deploy.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: 验证工作流语法**

```bash
cat .github/workflows/deploy.yml
```

肉眼检查 YAML 无缩进错误。如果本机有 `actionlint`，运行 `actionlint .github/workflows/deploy.yml`。

- [ ] **Step 4: 提交**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for test, build, and deploy to Pages"
```

- [ ] **Step 5: 文档化部署前置条件**

在 README（Task 18）中说明：首次部署需要在仓库 Settings → Pages → Source 选 "GitHub Actions"。

---

## Task 18: README 与手动验证

**Files:**
- Modify: `README.md`（覆盖）
- 手动验证（在浏览器中跑完整流程）

- [ ] **Step 1: 覆盖 README.md**

写入 `/home/cooper/githubProjects/obesity-calculator/README.md`：

```markdown
# 2026 肥胖评估

基于 2026 年 ADA 最新指南的肥胖评估工具。通过 BMI、腰围和腰高比（WHtR）进行综合诊断，支持移动端，亚裔专用标准，开源 Web App。

## 特性

- 3 个字段（身高 / 体重 / 腰围）即可出结果
- 默认采用 2026 ADA 新标准（亚裔切点）
- 独立的"2026 新标准解读"长文页
- 中英文 / 移动端 + 桌面端响应式
- 暗色模式自适应
- 零后端，纯静态，GitHub Pages 部署

## 本地开发

```bash
npm install
npm run dev
```

## 测试

```bash
npm test           # 跑一次
npm run test:watch # 监听
npm run check      # 类型检查
```

## 构建

```bash
npm run build
npm run preview
```

## 部署

项目配置了 GitHub Actions：push 到 `main` 自动跑测试 + 构建 + 部署到 GitHub Pages。

**首次部署前置条件**：在 GitHub 仓库 Settings → Pages → Source 选择 "GitHub Actions"。

部署完成后访问 `https://<username>.github.io/obesity-calculator/`。

## 测算逻辑

见 [设计文档](docs/superpowers/specs/2026-06-11-obesity-calculator-design.md) 第 6-7 节。

## 免责

本工具仅作参考，不构成医疗建议。如有疑虑，请咨询专业医生。

## License

MIT
```

- [ ] **Step 2: 手动验证 — 测算路径**

```bash
npm run dev -- --host
```

打开浏览器（Chrome）：

- [ ] 访问首页，输入 170 / 65 / 82 → 点"开始测算" → 看到结果页（"肥胖"分类，hero 红色）
- [ ] 返回首页，输入 170 / 60 / 75 → 点"开始测算" → 看到结果页（"正常"分类，hero 绿色）
- [ ] 输入 170 / 50 / 65 → 点"开始测算" → "偏瘦"
- [ ] 边界值：输入 170 / 53 / 75 → "正常"；输入 170 / 79 / 75 → "肥胖"
- [ ] 直接访问 `/#/result` → 自动跳回首页
- [ ] 切到 `/#/guide` → 看到解读长文，滚动到各章节
- [ ] 展开"不知道腰围怎么量？"提示 → 看到步骤
- [ ] 点击"非亚裔？切换人群" → 切换为非亚裔
- [ ] 切换暗色模式（OS 设置） → 颜色反转且文本可读

确认后 Ctrl+C。

- [ ] **Step 3: 手动验证 — 响应式**

用浏览器 DevTools 切到 iPhone 14 viewport：

- [ ] 表单三字段单列排列
- [ ] 结果页指标卡 2 列，腰围跨整行
- [ ] 解读页表格不溢出

- [ ] **Step 4: 手动验证 — 键盘 / 可访问性**

用 Tab 键从首页到结果页：

- [ ] 每个输入框都能 Tab 到，焦点环可见
- [ ] 主按钮 Enter 可触发
- [ ] 错误信息带 `role="alert"`，屏幕阅读器能读出

- [ ] **Step 5: 跑全部测试 + 类型检查**

```bash
npm test
npm run check
npm run build
```

Expected: 全部通过，0 错误。

- [ ] **Step 6: 提交**

```bash
git add README.md
git commit -m "docs: update README with usage, deployment, and verification checklist"
```

- [ ] **Step 7: 推送（触发部署）**

```bash
git push origin main
```

去 GitHub 仓库 Actions 页面查看 workflow：
- [ ] test job 通过
- [ ] build job 通过
- [ ] deploy job 通过
- [ ] 在 Settings → Pages 看到部署成功的 URL

访问该 URL，做最后一遍冒烟测试（步骤 2 的子集）。

---

## 验收

完成 Task 18 后，spec 第 15 节"验收"的全部 4 条应自动满足：

1. ✅ 三个页面在桌面 / 移动端浏览器均可使用（Task 18 手动验证）
2. ✅ `npm test` 全部通过（Task 18 Step 5）
3. ✅ 部署到 gh-pages 可访问（Task 18 Step 7）
4. ✅ 手动验收清单全部勾选（Task 18 Step 2-4）
