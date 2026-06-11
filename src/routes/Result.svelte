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
