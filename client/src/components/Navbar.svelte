<script>
  import MouseCoords from "./MouseCoords.svelte";
</script>

<style>
  .navbar {
    z-index: 40 !important;
  }

</style>

<nav class="navbar is-fixed-bottom is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="//summer2019.compclub.com.au">
      <img
        src="/assets/img/compclub.logo.white.svg"
        alt="logo"
        width="112"
        height="28" />
    </a>
  </div>
  <div class="navbar-menu">
  <a class="navbar-item has-text-grey">toggle questions</a>
    <div class="navbar-item is-expanded">
      <div class="orchestrator has-text-centered has-text-light" />
    </div>
    <div class="navbar-end">
      <div class="navbar-item is-paddingless">
       <MouseCoords />
      </div>
    </div>
  </div>
</nav>


 <!-- () =>
    document.querySelector("body > div.container").classList.toggle("hide"); -->
