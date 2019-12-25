<script>
  import Navbar from "./Navbar.svelte";
  import DotBackground from "./DotBackground.svelte";
</script>

<DotBackground />

<main>
  <slot />
</main>

<Navbar />
