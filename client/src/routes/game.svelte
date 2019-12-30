<script context="module">
  import CTF from "../components/CTFAPI.js";

  export async function preload(page, session) {
    const questionsFn = () =>
      this.fetch(CTF.GET.URL_GET_QUESTIONS, {
        credentials: "include"
      })
        .then(r => r.json())
        .then(json => json.data);

    const categoriesFn = () =>
      this.fetch(CTF.GET.URL_GET_CATEGORIES, {
        credentials: "include"
      })
        .then(r => r.json())
        .then(json => {
          let categories = {};
          for (let [id, name] of json.data) {
            categories[id] = name;
          }
          return categories;
        });

    const solvesFn = () =>
      this.fetch(CTF.GET.URL_GET_SOLVES, {
        credentials: "include"
      })
        .then(r => r.json())
        .then(json => json.data);

    let [questions, categories, solves] = await Promise.all([
      questionsFn(),
      categoriesFn(),
      solvesFn()
    ]);

    return { questions, categories, solves };
  }
</script>

<script>
  import Slot from "../components/_layout.svelte";
  import QuestionCard from "../components/QuestionCard.svelte";

export let questions;
export let categories;
// export let solves;

  let mergeData = [];
  $: {
    mergeData = questions.map(q => {
      let [id, title, description, points, categoryID] = q;
      return {
        id,
        title,
        description,
        points,
        categoryID,
        categoryName: categories[categoryID],
        solves: -1
      }
    });
  }
</script>

<Slot>
  {#each mergeData as data}
    <QuestionCard {...data} />
  {/each}
</Slot>
