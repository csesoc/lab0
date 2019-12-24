
<script>
export let data;

let title;
let description;
let category;
let points;
let active;

$: {
    title = data[1]
    description = data[2]
    points = data[3]
    category = data[4]
}


let card;

import QuestionModal from "./QuestionModal.svelte";

function openModal() {
    // Stub
}
</script>
<style>

</style>

<article class:active class="tile is-child notification is-3" bind:this={card} on:click={openModal}>
  <h1 class="title" >{title}</h1>
  <h2>{category}</h2>
  <h3>{points}</h3>
</article>
