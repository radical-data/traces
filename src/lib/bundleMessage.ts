import type { Feature, Point } from "geojson";

function getCoordinates(): [number, number] | [number, number, number] {
  // let location;
  // navigator.geolocation.getCurrentPosition((position) => {
  //   location.set(position.coords);
  // });
  // return location;
  return [45, 0];
}

function bundleMessage(data: Record<string, any>): Feature<Point> {
  const coordinates = getCoordinates();
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
      coordinates,
    },
  };

  return feature;
}

export { bundleMessage };
