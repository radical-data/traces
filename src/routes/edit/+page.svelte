<script lang="ts">
  import { trackers } from "../../stores";
  import Counter from "$lib/Counter.svelte";
  // import TextInput from "../../TextInput.svelte";
  // $trackers = [{ component: Counter }, { component: TextInput }];
  function addCounter() {
    $trackers = [...$trackers, { component: Counter }];
  }

  //   function addTextInput() {
  //     inputs = [...inputs, { component: TextInput }];
  //   }
</script>

<article>
  <section id="inputs">
    {#each $trackers as input}
      <svelte:component this={input.component} />
    {/each}
    <button on:click={addCounter}>Add Counter</button>
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
