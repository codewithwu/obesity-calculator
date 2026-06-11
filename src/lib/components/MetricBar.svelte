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
