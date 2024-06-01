<script lang="ts">
  import { downloadGeojson, downloadCsv } from "$lib/utils/controlData";
  import { convertGeojsonToSupabase } from "$lib/utils/geojsonToSupabase";
  import { collected_data } from "$lib/stores";
  import { onMount } from "svelte";

  let downloadType: "geojson" | "csv" = "geojson";
  let maps = [];
  let selectedMapId: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch("/api/maps");
      if (!response.ok) throw new Error("Failed to fetch maps");
      const result = await response.json();
      maps = result.maps;
    } catch (error) {
      console.error("Error fetching maps:", error);
    }
  });

  function handleClick(): void {
    if (downloadType == "geojson") {
      downloadGeojson();
    } else if (downloadType == "csv") {
      downloadCsv();
    }
  }

  async function handleAddData(): Promise<void> {
    if (!selectedMapId) {
      alert("Please select a map to share the data to.");
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(
          convertGeojsonToSupabase($collected_data, selectedMapId, "anonymous")
        ),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Data successfully submitted!");
      } else {
        const error = await response.json();
        alert(`Failed to submit data: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An unexpected error occurred");
    }
  }
</script>

<section>
  <h2>Export Settings</h2>
  <form>
    <label for="format">Format</label>
    <select id="format" size="2" bind:value={downloadType}>
      <option value="geojson">GeoJSON</option>
      <option value="csv">CSV</option>
    </select>
    <button type="button" on:click={handleClick}>Download data</button>
    <br />
    <label for="map">Select Map</label>
    <select id="map" bind:value={selectedMapId}>
      <option value="" disabled selected>Select a map</option>
      {#each maps as map}
        <option value={map.id}>{map.name}</option>
      {/each}
    </select>
    <button type="button" on:click={handleAddData}>Share data to map</button>
  </form>
</section>

<style>
  section {
    display: block;
    position: fixed;
    bottom: 0;
    z-index: 4;
    left: 0;
    width: 100%;
    height: 80%;
    overflow: auto;
    background-color: #e3c8ff;
    border: 3px solid #000;
    border-radius: 20px 60px 0px 0px;
    outline: 3px 3px 0px 3px;
  }
  section button {
    background-color: white;
  }
</style>
