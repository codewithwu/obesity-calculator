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
  let toast = $state<string | null>(null);
  let toastVisible = $state(false);

  onMount(() => {
    const m = $measurements;
    if (!m) {
      toast = '请先完成测算';
      toastVisible = true;
      setTimeout(() => {
        toastVisible = false;
        setTimeout(() => push('/'), 200);
      }, 1800);
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
  {:else if !toast}
    <p class="loading">正在加载...</p>
  {/if}

  {#if toast}
    <div class="toast" class:visible={toastVisible} role="status" aria-live="polite">
      {toast}
    </div>
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
  .toast {
    position: fixed;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%) translateY(1rem);
    background: var(--hero-warn);
    color: var(--fg);
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 0.95rem;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 1000;
    pointer-events: none;
  }
  .toast.visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>
