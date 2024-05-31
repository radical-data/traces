<script>
  import Nav from "$lib/Nav.svelte";
  import "../style.css";
</script>

<svelte:head />
<header><h1>Traces</h1></header>
<main>
  <slot />
</main>

<footer>
  <Nav></Nav>
  <p>A <a href="https://radicaldata.org">Radical Data</a> tool.</p>
</footer>

<style>
  h1 > span {
    transform: rotate(-30deg) translateY(-0.8em);
    margin-inline-end: -2.5em;
    display: inline-flex;
    font-size: medium;
    background-color: #fbc8ff;
    border-radius: 9999px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    padding-inline: 0.7em;
    padding-block: 0.2em 0.1em;
    z-index: 1;
  }
</style>
