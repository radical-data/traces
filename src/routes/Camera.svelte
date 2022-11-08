<script>
  import Input from "./Input.svelte";

  function previewFile() {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
</script>

<Input>
  <label for="cameraFileInput">
    <span class="btn">Take photo</span>

    <input
      id="cameraFileInput"
      type="file"
      accept="image/*"
      capture="environment"
      on:change={previewFile}
    />
  </label>

  <!-- displays the picture uploaded from the native camera -->
  <img alt="" />
</Input>

<style>
  #cameraFileInput {
    display: none;
  }

  img {
    width: 100%;
    height: auto;
    margin-top: 16px;
  }

  .btn {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 40px;
    border-color: black;
    border-style: solid;
  }
</style>
