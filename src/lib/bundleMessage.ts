import type { Feature, Point } from "geojson";

function bundleMessage(data: Record<string, any>, location: GeolocationPosition | {}): Feature<Point> {
  let coords: [number, number] | undefined;

  if ('coords' in location) {
    coords = [location.coords.longitude, location.coords.latitude];
  }

  const properties: Record<string, any> = {
    timestamp: new Date(),
  };
  for (const [key, value] of Object.entries(data)) {
    properties[key] = value;
  }
  const feature: Feature<Point> = {
    type: "Feature",
    properties,
    geometry: {
      type: "Point",
      coordinates: coords || [],
    },
  };

  return feature;
}

export { bundleMessage };
