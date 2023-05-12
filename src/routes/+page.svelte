<script lang="ts">
  import Counter from "$lib/Counter.svelte";
  import TextInput from "$lib/TextInput.svelte";
  import { onMount } from "svelte";
  import { trackers } from "../stores";

  import { mode } from "../stores";
  import ExportModal from "$lib/ExportModal.svelte";
  import AddInputModal from "$lib/AddInputModal.svelte";

  $trackers = [
    { component: Counter },
    { component: TextInput },
    { component: Counter },
    { component: TextInput },
  ];
  let showAddInputModal: boolean = false;
  function addInput() {
    showAddInputModal = true;
  }

  function chooseComponent(type: SvelteComponent) {
    $trackers = [...$trackers, { component: type }];
    showAddInputModal = false;
  }

  let currentPosition: GeolocationPosition;
  const options = {
    // enableHighAccuracy: true,
    // timeout: 5000,
    // maximumAge: 0,
  };
  function success(pos: GeolocationPosition) {
    const crd = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  }
  function error(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  function getLocation() {
    console.log("trying to get geolocation enabled");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
      navigator.geolocation.watchPosition(trackPosition, error, options);
      console.log("geo location enabled");
    } else {
      console.log("geo location failed");
      // geoEnabled.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function trackPosition(position: GeolocationPosition) {
    currentPosition = position;
  }
  let currentLocation;
  onMount(() => {
    getLocation();
  });
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
  {#if showAddInputModal}
    <div class="modal">
      <div class="modal-content">
        <button on:click={() => chooseComponent(Counter)}>Counter</button>
        <button on:click={() => chooseComponent(TextInput)}>Text</button>
      </div>
    </div>
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
