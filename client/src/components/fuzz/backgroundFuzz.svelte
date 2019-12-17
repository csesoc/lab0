<script>
import backgroundFuzz from "./backgroundFuzz.js"

import {onMount} from "svelte";

onMount(()=> {
    backgroundFuzz(container);
})

let container;
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
    background-color: rgba(0, 35,88 ,0.7);
}
.background canvas {
    transition: filter, transform 1s;
}

</style>
<div class="background">
</div>
<canvas bind:this={container}></canvas>