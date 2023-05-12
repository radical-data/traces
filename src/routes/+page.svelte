<script lang="ts">
  import Counter from "$lib/Counter.svelte";
  import TextInput from "$lib/TextInput.svelte";
  import { onMount } from "svelte";
  import { trackers } from "../stores";

  let mode: Mode = "collect";

  $trackers = [
    { component: Counter },
    { component: TextInput },
    { component: Counter },
    { component: TextInput },
  ];

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
  </section>
</article>

<style>
  #inputs {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(120px, 0.5fr));
    margin-block: 1em;
  }
</style>
