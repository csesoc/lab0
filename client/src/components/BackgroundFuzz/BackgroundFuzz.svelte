<script>
  import backgroundFuzz from "./BackgroundFuzz.js";

  import { onMount } from "svelte";

  export let resource;
  let container;

  onMount(() => {
    backgroundFuzz(resource, container);
  });
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>

<canvas bind:this={container} />
