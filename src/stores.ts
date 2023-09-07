import { writable, readable } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { FeatureCollection } from "geojson";
import { onMount } from "svelte";

export const trackers: Writable<Tracker[]> = writable([]);

export const collected_data: Writable<FeatureCollection> = writable({
  type: "FeatureCollection",
  features: [],
});

export const mode: Writable<Mode> = writable("collect");

export const coordinates: Writable<GeolocationPosition | {}> = writable({}, function start(set) {
  onMount(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          set(position);
          console.log('Geolocation updated:', position);
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
        }
      );

      return function stop() {
        navigator.geolocation.clearWatch(watchId);
        console.log('Geolocation watch stopped.');
      };
    } else {
      console.error('Geolocation API is not available.');
    }
  }
  )
});
