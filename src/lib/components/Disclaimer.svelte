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
