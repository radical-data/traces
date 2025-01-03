<script>
  import { onMount } from "svelte";
  import Nav from "$lib/components/Nav.svelte";

  let hasSetup = false;

  // Check setup status on load
  onMount(() => {
    hasSetup = localStorage.getItem("setupComplete") === "true";
  });
</script>

<main>
  <h1>Welcome to Traces</h1>
  <p>
    Traces helps you collect data during data walks. Start by setting up your
    interface or jump straight into data collection if you're ready.
  </p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }
</style>
