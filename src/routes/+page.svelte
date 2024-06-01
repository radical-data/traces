<script lang="ts">
  import { trackers, mode, showAddInputModal } from "$lib/stores";
  import { locationStore } from "$lib/stores/location";
  import ExportModal from "$lib/components/ExportModal.svelte";
  import AddInputModal from "$lib/components/AddInputModal.svelte";
  import closeIcon from "$lib/assets/close-icon.svg";

  function addInput() {
    showAddInputModal.set(true);
  }

  function removeTracker(index: number) {
    trackers.update((trackerList) => {
      trackerList.splice(index, 1);
      return [...trackerList];
    });
  }
</script>

<article>
  {#if $locationStore}
    <p>
      ({$locationStore.coords.latitude.toFixed(6)}, {$locationStore.coords.longitude.toFixed(
        6
      )})
    </p>
  {:else}
    <p>Allow geolocation</p>
  {/if}
  <section id="inputs">
    {#each $trackers as input, index (index)}
      <div class="tracker-container">
        <svelte:component this={input.component} />
        {#if $mode == "edit"}
          <button on:click={() => removeTracker(index)} class="delete-button">
            <img src={closeIcon} alt="close icon" />
          </button>
        {/if}
      </div>
    {/each}
    {#if $mode == "edit"}
      <button on:click={addInput} class="input">Add Input</button>
    {/if}
  </section>
  {#if $showAddInputModal}
    <AddInputModal />
  {/if}
  {#if $mode == "export"}
    <ExportModal />
  {/if}
</article>

<style>
  #inputs {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(120px, 0.5fr));
    margin-block: 1em;
  }
  button {
    aspect-ratio: 1;
  }
  button.input {
    background-color: var(--secondary-color);
  }

  .tracker-container {
    position: relative;
  }

  .delete-button {
    position: absolute;
    top: -12.5px;
    left: -12.5px;
    background-color: white;
    color: black;
    border: 2px solid black;
    border-radius: 999px;
    cursor: pointer;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .delete-button img {
    height: 10px;
    object-fit: contain;
  }

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
