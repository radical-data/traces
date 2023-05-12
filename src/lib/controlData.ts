import { get } from "svelte/store";
import { collected_data } from "../stores";

function generateFilename(): string {
    const now = new Date();
    const date = now.toLocaleDateString().replaceAll("/", "-");
    const time = now
      .toLocaleTimeString([], { hour12: false })
      .replaceAll(":", "-");
    return `datawalker_${date}_${time}`;
  }

  function downloadBlob(blob: Blob, extension: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${generateFilename()}.${extension}`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadGeojson() {
    const json = JSON.stringify(get(collected_data));
    const blob = new Blob([json], { type: "application/geo+json" });
    downloadBlob(blob, "geojson");
  }

  function downloadCsv() {
    const csv: string = geojsonToCsv(get(collected_data));
    const blob = new Blob([csv], { type: "text/csv" });
    downloadBlob(blob, "csv");
  }

  function geojsonToCsv(geojson: GeoJSON.FeatureCollection): string {
    const rows = [];
    const features = geojson.features;
    const headers = [];

    // Collect all unique property keys from all features
    const allPropertyKeys = new Set();
    features.forEach((feature) => {
      Object.keys(feature.properties as object).forEach((key) => {
        allPropertyKeys.add(key);
      });
    });

    // Add coordinate columns to headers
    headers.push("Longitude", "Latitude");

    // Add all unique property keys to headers
    allPropertyKeys.forEach((key) => {
      headers.push(key);
    });

    // Add headers row to rows array
    rows.push(headers.join(","));

    // Add data rows for each feature
    features.forEach((feature) => {
      const rowData = [];

      // Add latitude and longitude to row
      let coords;
      if (feature.geometry?.type === "Point") {
        coords = feature.geometry.coordinates;
        rowData.push(coords[1], coords[0]);
      } else {
        rowData.push("", "");
      }

      // Add feature property values to row
      allPropertyKeys.forEach((key) => {
        const value = feature.properties?.[key as keyof GeoJSON.GeoJsonObject];
        rowData.push(value ?? "");
      });

      // Add row to rows array
      rows.push(rowData.join(","));
    });

    return rows.join("\n");
  }

  export { downloadGeojson, downloadCsv }