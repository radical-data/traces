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
  const submissions = geojson.features.map((feature: any) => {
    return {
      map_id: mapId,
      data_type: feature.properties.input_type,
      data_label: feature.properties.label,
      data_content: feature.properties.value,
      location: `SRID=4326;POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`,
      timestamp: feature.properties.timestamp,
      submitted_by: submittedBy,
    };
  });
  return submissions;
}
