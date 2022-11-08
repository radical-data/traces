<script>
  import Geolocation from "svelte-geolocation";

  let getPosition = true;
</script>

<Geolocation
  {getPosition}
  let:coords
  let:loading
  let:success
  let:error
  let:notSupported
>
  {#if notSupported}
    Your browser does not support Geolocation. Try opening this page on another
    browser.
  {:else if loading}
    You must enable location services to use this app.
  {:else if success}
    <!-- <span class="smoothHide">Found you!</span> -->
    <span class="smoothHide">Found you!</span>
    <!-- {JSON.stringify(coords)} -->
  {:else if error}
    An error occurred.
    <!-- {error.code} -->
    <!-- {error.message}. -->
    Try refreshing this page. If that doesn't help, try opening this page on another
    browser.
  {/if}
</Geolocation>

<style>
  .smoothHide {
    animation: hideAnimation 0s ease-in 2s;
    animation-fill-mode: forwards;
  }

  @keyframes hideAnimation {
    to {
      visibility: hidden;
    }
  }
</style>
