<script lang="ts">
  import InputGrid from "$lib/components/InputGrid.svelte";
  import AddInputModal from "$lib/components/AddInputModal.svelte";
  import { showAddInputModal } from "$lib/stores";

  function addInput() {
    showAddInputModal.set(true);
  }
</script>

<InputGrid>
  <button on:click={addInput} class="input">Add Input</button>
</InputGrid>
{#if $showAddInputModal}
  <AddInputModal />
{/if}

<style>
  button.input {
    background-color: var(--secondary-color);
  }
</style>
