
<script>
export let title;
export let category;
export let points;
export let active;

let card;

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
