<script>
  import { mode } from "../stores";

  const handleEditClick = () => {
    $mode = "edit";
  };

  const handleCollectClick = () => {
    $mode = "collect";
  };

  const handleExportClick = () => {
    $mode = "export";
  };

  $: editClass = $mode === "edit" ? "edit" : "";
  $: collectClass = $mode === "collect" ? "collect" : "";
  $: exportClass = $mode === "export" ? "export" : "";
</script>

<nav>
  <button on:click={handleEditClick} class={editClass}>Edit</button>
  <button on:click={handleCollectClick} class={collectClass}>Collect</button>
  <button on:click={handleExportClick} class={exportClass}>Export</button>
</nav>

<style>
  nav {
    z-index: 99;
    position: fixed;
    bottom: 20px;
    width: auto;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0 0;
    display: inline-flex; /* Changed from flex */
    justify-content: space-between;
    align-items: center;
  }

  nav button {
    background-color: #eee;
    color: #333;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    margin-right: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  nav button:last-child {
    margin-right: 0;
  }

  nav button:hover {
    background-color: #ddd;
  }

  nav button.edit {
    /* Style for the Edit button when mode is "edit" */
    background-color: blue;
    color: white;
  }

  nav button.collect {
    /* Style for the Collect button when mode is "collect" */
    background-color: green;
    color: white;
  }

  nav button.export {
    /* Style for the Export button when mode is "export" */
    background-color: orange;
    color: white;
  }
</style>
