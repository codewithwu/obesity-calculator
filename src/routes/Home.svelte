<script lang="ts">
  import InputField from '../lib/components/InputField.svelte';
  import { measurements, ethnicity, setEthnicity } from '../lib/store';
  import { diagnose } from '../lib/diagnose';
  import { push } from 'svelte-spa-router';
  import waistImg from '../assets/waist-measurement.jpg';
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
    <h1>2026 体重指标速查</h1>
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
    <figure class="hint-figure">
      <img src={waistImg} alt="腰围测量示意图：软尺在肚脐水平位置绕腰一圈" loading="lazy" />
      <figcaption>软尺在肚脐水平位置绕腰一周</figcaption>
    </figure>
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
  .hint-figure {
    margin: 0.875rem 0 0;
    text-align: center;
  }
  .hint-figure img {
    max-width: 100%;
    height: auto;
    max-height: 320px;
    border-radius: 0.5rem;
    display: block;
    margin: 0 auto;
  }
  .hint-figure figcaption {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: var(--fg-muted);
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
