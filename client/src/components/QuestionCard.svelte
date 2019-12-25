<script>
  export let data;

  let title;
  let description;
  let category;
  let points;
  let solved;

  $: {
    title = data[1];
    description = data[2];
    points = data[3];
    category = data[4];
  }

  let card;

  import QuestionModal from "./QuestionModal.js";

  function openModal() {
    console.log("modal");
    QuestionModal.createModal()
    // Stub
  }
</script>

<style>
  article {
    transition: box-shadow 250ms;
    background-color: rgba(22, 131, 155, 0.3) !important;
    border: 1px #dbdbdb !important;
    color: grey;
    cursor: pointer;
  }

  article:hover {
    box-shadow: inset 0 0 60px rgba(11, 126, 152, 0.5);
    color: white;
  }

  article.solved {
    filter: saturate(0);
  }

  article h2:not(:empty)::before {
    content: "category: ";
    font-size: 0.75rem;
  }

  article h3:not(:empty)::before {
    content: "points: ";
    font-size: 0.75rem;
  }

  article.tile {
    transition: color 0.3s, box-shadow 0.3s;
  }

  article.tile.is-child {
    margin: 5px !important;
    pointer-events: auto;
  }

  @media screen and (min-width: 769px) {
    article.tile.is-child {
      width: 23%;
      min-height: 25vh;
    }
  }
</style>

<article
  class:solved
  class="tile is-child notification is-3"
  bind:this={card}
  on:click={openModal}>
  <h1 class="title">{title}</h1>
  <h2>{category}</h2>
  <h3>{points}</h3>
</article>
