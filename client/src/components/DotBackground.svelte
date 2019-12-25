<style>
  /* Dot colour */
  div.background svg .points path {
    fill: white;
    stroke: transparent;
    stroke-width: 5px;
  }

  /* Region tracer effect */
  div.background svg path:not(:hover) {
    transition: fill 6.5s;
  }

  div.background svg path:hover {
    fill: red;
  }

  /* Region hover effect */
  /* Originally wanted to do a fill transition, but it conflicted with the tracer points */
  div.background svg g.points {
    transition: opacity 1s;
  }

  div.background svg g.regions g:not(:hover) g.points,
  div.background svg > g.points path:not(:hover) {
    opacity: 0.3;
  }

  /* Hide mouse area regions */
  div.background svg g.mouseArea {
    opacity: 0;
  }

  div.background svg g.mouseArea path {
    fill: #6abd45;
  }
</style>
