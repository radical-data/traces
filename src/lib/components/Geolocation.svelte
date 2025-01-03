<script lang="ts">
  import { locationStore } from "$lib/stores/location";
</script>

{#if $locationStore}
    <p>
      ({$locationStore.coords.latitude.toFixed(6)}, {$locationStore.coords.longitude.toFixed(
        6
      )})
    </p>
  {:else}
    <p>Allow geolocation</p>
  {/if}