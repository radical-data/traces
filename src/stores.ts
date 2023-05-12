import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { FeatureCollection } from "geojson";

export const trackers: Writable<Tracker[]> = writable([]);

export const data: Writable<FeatureCollection> = writable({
  type: "FeatureCollection",
  features: [],
});
