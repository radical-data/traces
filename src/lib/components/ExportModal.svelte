<script lang="ts">
  import { downloadGeojson, downloadCsv } from "$lib/utils/controlData";

  let downloadType: "geojson" | "csv" = "geojson";

  function handleClick(): void {
    if (downloadType == "geojson") {
      downloadGeojson();
    } else if (downloadType == "csv") {
      downloadCsv();
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
    <button on:click={handleClick}>Download data</button>
  </form>
</section>

<style>
  section {
    display: block;
    position: fixed;
    bottom: 0;
    z-index: 1;
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
