<script>
  import BackgroundFuzz from "../../components/BackgroundFuzz/BackgroundFuzz.svelte";
</script>

<style>
  .background {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .background:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 1s;
    background-color: rgba(0, 35, 88, 0.7);
  }
</style>


<div class="background">
  <BackgroundFuzz resource="invite/background.jpg" />
</div>
