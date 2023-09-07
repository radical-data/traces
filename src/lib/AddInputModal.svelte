<script>
  let showModal = false;
  let component = "";

  function addInput() {
    showModal = true;
  }

  function chooseComponent(type) {
    component = type;
    showModal = false;
  }
</script>

<div class="modal">
  <div class="modal-content">
    <button on:click={() => chooseComponent("Counter")}>Counter</button>
    <button on:click={() => chooseComponent("Text")}>Text</button>
    <button on:click={() => chooseComponent("Path")}>Path</button>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
