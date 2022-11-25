<script>
  import Input from "./Input.svelte";
  import { textfit } from "svelte-textfit";
  let parent;

  export let title = "Text";
  export let mode = "collect";
  function submit() {
    update();
  }
  function keySubmit(event) {
    if (event.key === "Enter") {
      update();
    }
  }
  let value = "";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function update() {
    if (mode == "collect") {
      if (value !== "") {
        dispatch("update", {
          input_type: "text",
          title: { title },
          value: { value },
        });
        value = "";
        if (value == "") {
          // shake input
        }
      }
    }
  }
</script>

<Input>
  <label for="free-text">{title}</label>
  <input
    type="text"
    id="free-text"
    name="free-text"
    bind:value
    on:keydown={keySubmit}
  />
  <button type="submit" on:click={submit}
    >{#if mode == "edit"}
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
</Input>

<style>
  label {
    display: none;
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
  button {
    margin-block-start: 0.5rem;
    max-width: 100%;
  }
</style>
