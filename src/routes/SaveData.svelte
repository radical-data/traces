<script>
  import { saveAs } from "file-saver";

  export let output;

  function saveJson() {
    let blob = new Blob([JSON.stringify(output)], {
      type: "application/geo+json",
    });
    let d = new Date();
    let formatted_date =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      "_" +
      d.getHours() +
      "-" +
      d.getMinutes() +
      "-" +
      d.getSeconds();
    let extension = ".geojson";
    let file_name = "data-walk_" + formatted_date + extension;
    saveAs(blob, file_name);
  }
</script>

<button on:click={saveJson}>Export Data</button>
