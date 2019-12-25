<script>
  import SVGLoader from "./SVGLoader.svelte";
  import "./scanlines.css";
</script>

<style>
  /* Dot colour */
  :global(div.background svg) .points path {
    fill: white;
    stroke: transparent;
    stroke-width: 5px;
  }

  /* Region tracer effect */
  :global(div.background svg) path:not(:hover) {
    transition: fill 6.5s;
  }

  :global(div.background svg) path:hover {
    fill: red;
  }

  /* Region hover effect */
  /* Originally wanted to do a fill transition, but it conflicted with the tracer points */
  :global(div.background svg) g.points {
    transition: opacity 1s;
  }

  :global(div.background svg) g.regions g:not(:hover) g.points,
  :global(div.background svg) > g.points path:not(:hover) {
    opacity: 0.3;
  }

  /* Hide mouse area regions */
  :global(div.background svg) g.mouseArea {
    opacity: 0;
  }

  :global(div.background svg) g.mouseArea path {
    fill: #6abd45;
  }

  div.background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
  }

  div.background:after {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 35, 88, 0.7);
  }

  div.background :global(*) {
    cursor: crosshair !important;
  }

  div.background :global(img),
  div.background :global(svg) {
    height: 100%;
    width: 100%;
  }
</style>

<div class="background scanlines">
  <SVGLoader imageURL="/assets/img/worldmap.background.svg" />
</div>
