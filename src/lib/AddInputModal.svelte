<script lang="ts">
  import { showAddInputModal, trackers } from "../stores";
  import CountInput from "./CountInput.svelte";
  import TextInput from "./TextInput.svelte";

  function chooseComponent(componentType) {
    $trackers = [...$trackers, { component: componentType }];
    showAddInputModal.set(false);
  }

  function closeModal() {
    showAddInputModal.set(false);
  }
</script>

<div class="modal">
  <div class="modal-content">
    <button class="close-button" on:click={closeModal}>×</button>
    <button on:click={() => chooseComponent(CountInput)}>Counter</button>
    <button on:click={() => chooseComponent(TextInput)}>Text</button>
  </div>
</div>

<style>
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

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .close-button:hover {
    color: red;
  }
</style>
