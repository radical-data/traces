<script>
  import Camera from "./Camera.svelte";
  import Counter from "./Counter.svelte";
  import Words from "./Words.svelte";
  // import Geolocation from "./Geolocation.svelte";
  import SaveData from "./SaveData.svelte";
  import MessageReadOut from "./MessageReadOut.svelte";
  import "../style.css";
  import { onMount } from "svelte";

  let mode = "collect";
  function editLabels() {
    mode = mode == "collect" ? "edit" : "collect";
  }

  let inputs = [{ label: "Counter" }];
  function addItem() {
    inputs = inputs.concat({});
  }

  let currentPosition = { coords: "ye" };
  const options = {
    // enableHighAccuracy: true,
    // timeout: 5000,
    // maximumAge: 0,
  };
  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  function error(err) {
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

  function trackPosition(position) {
    currentPosition = position;
  }

  onMount(() => {
    getLocation();
  });

  let messages = { type: "FeatureCollection", features: [] };

  const addNewMessage = (event) => {
    let bundledMessage = bundleMessage(event.detail);
    messages.features = [...messages.features, bundledMessage];
    // messages.push(bundledMessage);
    // messages = messages;
    console.log(messages);
  };

  function bundleMessage(message) {
    let input = message.input.input;
    let value = message.value.value;
    let date = new Date();
    let coords = [
      currentPosition.coords.longitude,
      currentPosition.coords.latitude,
    ];
    if (currentPosition.coords.altitude !== null) {
      coords.push(currentPosition.coords.altitude);
    }
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coords,
      },
      properties: {
        input,
        value,
        date,
      },
    };
  }
</script>

<svelte:head />
<header><h1>Data Walk Collecter</h1></header>
<main>
  <aside>
    <!-- <Geolocation /> -->
  </aside>
  <article>
    <section id="edit-interface">
      <MessageReadOut {messages} />
      <button on:click={editLabels}
        >{mode == "collect" ? "Edit Interface" : "Save Interface"}</button
      >
      {#if mode == "edit"}
        <button on:click={addItem}>Add Counter</button>
      {/if}
    </section>
    <section id="inputs">
      {#each inputs as input}
        <svelte:component this={Counter} {mode} on:update={addNewMessage} />
      {/each}
      <Words on:update={addNewMessage} />
      <!-- <Camera /> -->
    </section>
    <section>
      <SaveData output={messages} />
    </section>
  </article>
</main>

<footer>
  Created by
  <a href="https://radicaldata.org">Radical Data</a> as part of
  <a href="https://comapping.org">Comapping</a>.
</footer>

<style>
  #inputs {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(120px, 0.5fr));
    margin-block: 1em;
  }
</style>
