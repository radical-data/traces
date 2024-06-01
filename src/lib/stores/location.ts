import { readable, type Readable } from "svelte/store";

export const locationStore: Readable<GeolocationPosition | null> =
  readable<GeolocationPosition | null>(null, (set) => {
    if (!("geolocation" in navigator)) {
      console.log("Geolocation not available");
      set(null);
      return;
    }

    const success = (position: GeolocationPosition) => set(position);
    const error = (error: GeolocationPositionError) => {
      console.error(`Geolocation error: ${error.message}`);
      set(null);
    };

    const params: PositionOptions = { enableHighAccuracy: true };
    const watcher = navigator.geolocation.watchPosition(success, error, params);

    return () => navigator.geolocation.clearWatch(watcher);
  });
