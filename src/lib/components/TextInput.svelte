<script lang="ts">
  import { collected_data, mode } from "$lib/stores";
  import { bundleMessage } from "$lib/utils/bundleMessage";
  import { locationStore } from "$lib/stores/location";
  let label: string = "Text";
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
          label,
          value,
        };
        $collected_data.features = [
          ...$collected_data.features,
          bundleMessage(message, $locationStore),
        ];
        lastValue = value;
        value = "";
        element.blur();
      }
    }
  }
</script>

<div class="container">
  <div class="button-wrapper">
    <p class="last-value">{lastValue}</p>
    <button class="input" onclick={update}></button>
    {#if $mode == "edit"}
      <input
        type="text"
        {id}
        bind:value={label}
        placeholder="Input Name"
        onkeydown={editKeySubmit}
      />
    {:else}
      <input
        type="text"
        {id}
        name="free-text"
        placeholder={label}
        bind:value
        onkeydown={keySubmit}
      />
    {/if}
  </div>
</div>
<label for={id}>{label}</label>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .button-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }
  .last-value {
    position: absolute;
    top: 10px;
    width: calc(100% - 20px);
    text-align: center;
    margin: 0;
    padding: 0 10px;
    overflow-wrap: break-word;
    white-space: normal;
    max-height: 30%;
    overflow-y: scroll;
    z-index: 1;
  }
  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  label {
    display: none;
  }
  input {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
    width: 80%;
    padding: 10px;
    border: 0;
    border-bottom: 2px solid black;
    background-color: transparent;
    box-sizing: border-box;
    z-index: 2;
  }
</style>
