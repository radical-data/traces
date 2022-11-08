<script>
  import Input from "./Input.svelte";
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
    dispatch("update", { input: { input: "text" }, value: { value } });
    value = "";
  }
</script>

<Input>
  <label for="free-text">Free text</label>
  <input
    type="text"
    id="free-text"
    name="free-text"
    bind:value
    on:keydown={keySubmit}
  />
  <button type="submit" on:click={submit}>Add</button>
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
    width: 100%;
    border: 0;
    border-block-end: 2px;
    border-color: black;
    border-style: solid;
  }
</style>
