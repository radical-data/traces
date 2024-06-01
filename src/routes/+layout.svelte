<script>
  import Nav from "$lib/components/Nav.svelte";
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
  p>a {
    text-decoration: none;
    color: black;
    font-weight: bold;

  }
</style>