import type { Feature, Point } from "geojson";

function bundleMessage(data: Record<string, any>, coordinates: GeolocationPosition | {}): Feature<Point> {
  let coords: [number, number] | undefined;

  if ('coords' in coordinates) {
    coords = [coordinates.coords.longitude, coordinates.coords.latitude];
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
