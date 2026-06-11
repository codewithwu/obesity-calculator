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
