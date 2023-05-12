<script lang="ts">
  import { collected_data } from "../stores";
  import { bundleMessage } from "$lib/bundleMessage";
  import { mode } from "../stores";
  let title: string = "Text";
  let value: string = "";
  let lastValue: string = "";

  let id: string = `free-text-${Math.random().toString(36).substring(2)}`;

  function keySubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      update();
    }
  }

  function editKeySubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const element = document.getElementById(id);
      if (element) {
        element.blur();
      }
    }
  }

  function update() {
    const element = document.getElementById(id);
    if (element !== null) {
      if (value == "") {
        element.focus();
      } else {
        let message: Message = {
          input_type: "text",
          title,
          value,
        };
        $collected_data.features = [
          ...$collected_data.features,
          bundleMessage(message),
        ];
        lastValue = value;
        value = "";
        element.blur();
      }
    }
  }
</script>

<button class="input" on:click={update}>
  <!-- <p>{lastValue}</p> -->
  {#if $mode == "edit"}
    <input
      type="text"
      {id}
      bind:value={title}
      placeholder="Input Name"
      on:keydown={editKeySubmit}
    />
  {:else}
    <input
      type="text"
      {id}
      name="free-text"
      placeholder={title}
      bind:value
      on:keydown={keySubmit}
    />
  {/if}
</button>
<label for={id}>{title}</label>

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
</style>
