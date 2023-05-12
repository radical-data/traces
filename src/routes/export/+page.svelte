<script lang="ts">
  import { saveAs } from "file-saver";
  import { data } from "../../stores";
  function downloadData(
    format: string = "geojson",
    includeAttachments: boolean = false
  ) {
    let blob: Blob = new Blob([JSON.stringify($data)], {
      type: "application/geo+json",
    });
    let d: Date = new Date();
    let formatted_date: string =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      "-" +
      d.getHours() +
      "-" +
      d.getMinutes() +
      "-" +
      d.getSeconds();
    let extension: string = ".geojson";
    let file_name: string = "data-walk-" + formatted_date + extension;
    saveAs(blob, file_name);
  }
  function handleClick(event: MouseEvent): void {
    downloadData("geojson", true);
  }
</script>

<section>
  <h2>Export Settings</h2>
  <form>
    <label for="format">Format</label>
    <select id="format" size="2">
      <option selected>GeoJSON</option>
      <option>CSV</option>
    </select>
    <label for="attachments">Attachments</label>
    <select id="attachments" size="2">
      <option selected>Include</option>
      <option>Exclude</option>
    </select>
    <button on:click={handleClick}>Download data</button>
  </form>
</section>
