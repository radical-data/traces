<script lang="ts">
  import { downloadGeojson, downloadCsv } from "$lib/utils/controlData";
  import { convertGeojsonToSupabase } from "$lib/utils/geojsonToSupabase";
  import { collected_data } from "$lib/stores";
  import { onMount } from "svelte";
  import { openDB } from "$lib/utils/IndexedDBUtil";
  import { writable } from "svelte/store";

  let downloadType: "geojson" | "csv" = "geojson";
  let maps = [];
  let selectedMapId: string | null = null;
  let showConfirmationDialog = writable(false);

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

  async function clearIndexedDB() {
    try {
      const db = await openDB("TracesDB", "tracesStore");
      const transaction = db.transaction("tracesStore", "readwrite");
      const store = transaction.objectStore("tracesStore");
      store.clear();
      alert("IndexedDB cleared successfully!");
      // Reset the collected_data store
      collected_data.set({
        type: "FeatureCollection",
        features: [],
      });
    } catch (error) {
      console.error("Error clearing IndexedDB:", error);
      alert("Failed to clear IndexedDB");
    } finally {
      showConfirmationDialog.set(false);
    }
  }

  function confirmClearData() {
    showConfirmationDialog.set(true);
  }

  function cancelClearData() {
    showConfirmationDialog.set(false);
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
    <br />
    <button type="button" on:click={confirmClearData}>Clear Data</button>
  </form>

  {#if $showConfirmationDialog}
    <div class="confirmation-dialog">
      <p>
        Are you sure you want to clear all data? This action cannot be undone.
      </p>
      <button type="button" on:click={clearIndexedDB}>Yes, clear data</button>
      <button type="button" on:click={cancelClearData}>Cancel</button>
    </div>
  {/if}
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
  .confirmation-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 2px solid #000;
    border-radius: 10px;
    z-index: 10;
  }
  .confirmation-dialog button {
    margin: 5px;
  }
</style>
