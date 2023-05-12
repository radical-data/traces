<script>
  import { onDestroy } from "svelte";

  import { mode } from "../stores";

  const handleEditClick = () => {
    $mode = "edit";
    // window.history.pushState(null, "", `?mode=${mode}`);
  };

  //   onDestroy(() => {
  //     window.history.replaceState(null, "", window.location.pathname);
  //   });

  const handleCollectClick = () => {
    $mode = "collect";
    // window.history.pushState(null, "", `?mode=${mode}`);
  };

  const handleExportClick = () => {
    $mode = "export";
    // window.history.pushState(null, "", `?mode=${mode}`);
  };
</script>

<nav>
  <button on:click={handleEditClick}>Edit</button>
  <button on:click={handleCollectClick}>Collect</button>
  <button on:click={handleExportClick}>Export</button>
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

  nav button,
  nav a {
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

  nav button:last-child,
  nav a:last-child {
    margin-right: 0;
  }

  nav button:hover,
  nav a:hover {
    background-color: #ddd;
  }
</style>
