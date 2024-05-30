<script lang="ts">
  import { trackers, mode, coordinates, showAddInputModal } from "../stores";
  import ExportModal from "$lib/ExportModal.svelte";
  import AddInputModal from "$lib/AddInputModal.svelte";

  function addInput() {
    showAddInputModal.set(true)
  }

</script>

<article>
  <section id="inputs">
    {#each $trackers as input}
      <svelte:component this={input.component} />
    {/each}
    {#if $mode == "edit"}
      <button on:click={addInput} class="input">Add Input</button>
    {/if}
  </section>
  {#if $showAddInputModal}
    <AddInputModal></AddInputModal>
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
    background-color: var(--secondary-color);
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
