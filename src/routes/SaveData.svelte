<script>
  import { saveAs } from "file-saver";

  export let output;

  function saveJson() {
    let blob = new Blob([JSON.stringify(output)], {
      type: "application/json",
    });
    saveAs(blob, "export.json");
  }
</script>

<button on:click={saveJson}>Export GeoJson</button>
