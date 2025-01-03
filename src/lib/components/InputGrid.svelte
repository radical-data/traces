<script lang="ts">
  import { trackers, mode, showAddInputModal } from "$lib/stores";
  import closeIcon from "$lib/assets/close-icon.svg";
  import { page } from "$app/state";
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

<section id="inputs">
  {#each $trackers as input, index (index)}
    <div class="tracker-container">
      <svelte:component this={input.component} />
      {#if page.url.pathname == "/edit"}
        <button on:click={() => removeTracker(index)} class="delete-button">
          <img src={closeIcon} alt="close icon" />
        </button>
      {/if}
    </div>
  {/each}
  <slot></slot>
</section>

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
</style>
