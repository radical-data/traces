<script>
  import Input from "./Input.svelte";

  export let title = "Counter";
  export let mode = "collect";
  let value = 0;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function update() {
    if (mode == "collect") {
      value += 1;
      dispatch("update", {
        input_type: "counter",
        title: { title },
        value: { value },
      });
    }
  }
</script>

<Input>
  <div>
    <p>{value}</p>
    <button on:click={update}>
      {#if mode == "edit"}
        <input bind:value={title} type="text" id="buttonLabel" />
      {:else}
        {title}
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
    font-size: 1.3rem;
    width: 100%;
  }
  button {
    max-width: 100%;
  }
  input[type="text"] {
    padding: 10px;
    width: calc(100% - 20px);
    border: 0;
    border-block-end: 2px;
    border-color: black;
    border-style: solid;
    background-color: transparent;
  }
</style>
