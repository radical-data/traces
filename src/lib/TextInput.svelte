<script lang="ts">
  import { data } from "../stores";
  import { bundleMessage } from "$lib/bundleMessage";
  export let title: string = "Text";
  let value: string = "";
  let lastValue: string = "";

  let id: string = `free-text-${Math.random().toString(36).substring(2)}`;

  function keySubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      update();
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
        $data.features = [...$data.features, bundleMessage(message)];
        lastValue = value;
        value = "";
        element.blur();
      }
    }
  }
</script>

<button class="input" on:click={update}>
  <!-- <p>{lastValue}</p> -->
  <input
    type="text"
    {id}
    name="free-text"
    placeholder={title}
    bind:value
    on:keydown={keySubmit}
  />
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
