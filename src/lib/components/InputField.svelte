<script lang="ts">
  interface Props {
    label: string;
    unit: string;
    value: number | null;
    min: number;
    max: number;
    step?: number;
    onchange?: (n: number | null) => void;
  }

  let {
    label,
    unit,
    value = $bindable(null),
    min,
    max,
    step = 1,
    onchange
  }: Props = $props();

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
      onchange?.(null);
      return;
    }
    const n = Number(t.value);
    if (!Number.isFinite(n)) {
      value = null;
      onchange?.(null);
      return;
    }
    value = n;
    onchange?.(n);
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
