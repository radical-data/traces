<script lang="ts">
  import { mode } from "$lib/stores";
  import editIcon from "$lib/assets/edit-icon.svg";
  import collectIcon from "$lib/assets/add-icon.svg";
  import exportIcon from "$lib/assets/export-icon.svg";

  const handleEditClick = () => {
    $mode = "edit";
  };

  const handleCollectClick = () => {
    $mode = "collect";
  };

  const handleExportClick = () => {
    $mode = "export";
  };

  $: editClass = $mode === "edit" ? "active" : "";
  $: collectClass = $mode === "collect" ? "active" : "";
  $: exportClass = $mode === "export" ? "active" : "";
</script>

<nav>
  <button on:click={handleEditClick} class={editClass}>
    <img src={editIcon} alt="edit icon" class="icon" />
    <span>Edit</span>
  </button>
  <button on:click={handleCollectClick} class={collectClass}>
    <img src={collectIcon} alt="collect icon" class="icon" />
    <span>Collect</span>
  </button>
  <button on:click={handleExportClick} class={exportClass}>
    <img src={exportIcon} alt="export icon" class="icon" />
    <span>Export</span>
  </button>
</nav>

<style>
  nav {
    z-index: 99;
    position: fixed;
    bottom: 35px;
    background-color: rgba(30, 30, 42, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 999px;
    padding-block-start: 7px;
    padding-inline: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav button {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 70px;
  }

  nav button.active > span {
    color: var(--secondary-color);
  }

  nav button.active > .icon {
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(3409%)
      hue-rotate(359deg) brightness(103%) contrast(104%);
  }

  nav button img {
    width: 40px;
    height: 40px;
  }

  nav button span {
    color: #ffffff;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
