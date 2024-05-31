import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { FeatureCollection } from "geojson";
import CountInput from "$lib/CountInput.svelte";
import TextInput from "$lib/TextInput.svelte";

export const trackers: Writable<Tracker[]> = writable([{ component: CountInput }, { component: TextInput }]);

export const collected_data: Writable<FeatureCollection> = writable({
  type: "FeatureCollection",
  features: [],
});

export const mode: Writable<Mode> = writable("collect");

export const showAddInputModal: Writable<boolean> = writable(false);