<script>
  import Input from "./Input.svelte";

  export let input = "Counter";
  export let mode = "collect";
  let value = 0;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function update() {
    value += 1;
    dispatch("update", { input: { input }, value: { value } });
  }
</script>

<Input>
  <div>
    <p>{value}</p>
    <button on:click={update}>
      {#if mode == "edit"}
        <input bind:value={input} type="text" id="buttonLabel" />
      {:else}
        {input}
      {/if}</button
    >
  </div>
</Input>

<style>
  p {
    font-size: 3rem;
    margin: 0;
  }
  input {
    width: 100%;
  }

  button {
    max-width: 100%;
  }
</style>
