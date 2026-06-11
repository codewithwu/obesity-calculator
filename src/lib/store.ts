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
