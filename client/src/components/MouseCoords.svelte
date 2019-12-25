<script>
  import onMount from "svelte";

  let elem;

  onMount(() => {
    let x = elem.querySelector("[name=mouseX]");
    let y = elem.querySelector("[name=mouseY]");

    document.body.addEventListener("mousemove", evt => {
      x.innerText = evt.clientX;
      y.innerText = evt.clientY;
    });
  });
</script>

<style>
  .mouseCoordinates [name="mouseX"]:not(:empty)::before {
    content: "x:";
  }

  .mouseCoordinates [name="mouseX"]:not(:empty)::after {
    content: "\00a0 ";
  }

  .mouseCoordinates [name="mouseY"]:not(:empty)::before {
    content: "y:";
  }

  .mouseCoordinates {
    width: 150px;
  }
</style>

<div class="mouseCoordinates" bind:this={elem}>
  <div name="mouseX" />
  <div name="mouseY" />
</div>
