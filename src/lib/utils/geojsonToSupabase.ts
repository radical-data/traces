export interface SupabaseDataSubmission {
  id: string;
  map_id: string;
  data_type: string;
  data_label: string;
  data_content: string;
  created_at: string;
  submitted_by: string;
  location: string; // PostGIS point format
  timestamp: string;
}

export function convertGeojsonToSupabase(
  geojson: any,
  mapId: string,
  submittedBy: string
): SupabaseDataSubmission[] {
  const submissions = geojson.features
    .map((feature: any) => {
      const coords = feature.geometry.coordinates;

      // Ensure coordinates are valid numbers
      if (
        !Array.isArray(coords) ||
        coords.length !== 2 ||
        typeof coords[0] !== "number" ||
        typeof coords[1] !== "number"
      ) {
        console.error("Invalid coordinates found:", coords);
        return null;
      }

      return {
        map_id: mapId,
        data_type: feature.properties.input_type,
        data_content: feature.properties.value,
        location: `SRID=4326;POINT(${coords[0]} ${coords[1]})`,
        timestamp: feature.properties.timestamp,
        submitted_by: submittedBy,
        data_label: feature.properties.label,
      };
    })
    .filter((submission) => submission !== null);

  console.log("Converted submissions:", submissions);
  return submissions;
}
