<script lang="ts">
  import { textfit } from "svelte-textfit";
  import { data } from "../stores";
  import { bundleMessage } from "$lib/bundleMessage";

  export let title: string = "Counter";
  export let mode: Mode = "collect";
  let value: number = 0;
  let parent: Node;

  function update() {
    if (mode == "collect") {
      value += 1;
      let message: Message = {
        input_type: "counter",
        title,
        value: value.toString(),
      };
      $data.features = [...$data.features, bundleMessage(message)];
    }
  }
</script>

<button class="input" on:click={update}>
  <p>{value}</p>

  {#if mode == "edit"}
    <input bind:value={title} type="text" id="buttonLabel" />
  {:else}
    <div bind:this={parent}>
      <span
        use:textfit={{
          parent,
          update: { title },
        }}
      >
        {title}
      </span>
    </div>
  {/if}</button
>

<style>
  p {
    font-size: 3rem;
    margin: 0;
  }
  input {
    font-size: 1.3rem;
    width: 100%;
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
