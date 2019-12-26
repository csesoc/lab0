<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function close() {
    dispatch("destroy");
  }
  import { fade } from "svelte/transition";

  export let data;

  let title;
  let description;
  let category;
  let points;
  let solved;

  let flagValue;
  let submissionEnabled = true;

  function submitFlag() {
    let value = flagValue.trim();
    if (!value) return;

    // check if valid flag format

    submissionEnabled = false;

    console.log("Submit " + flagValue);

    if (true) {
      // modal.querySelector("[name=flag]").placeholder = "flag correct";

      solved = true;
    } else {
      //  modal.querySelector("[name=flag]").placeholder =
      //         flagValue + " was not right!";
      flagValue = "";
    }
  }
  
  $: {
    title = data[1];
    description = data[2];
    points = data[3];
    category = data[4];
  }
</script>

<style>
  .questionModal {
    /* display: flex; */
    display: table-cell;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    vertical-align: middle;

    /* pointer-events: none; */
  }

  .questionModal .modal-card {
    height: 75%;
  }

  .questionModal .modal-card > * {
    border: 2px solid rgba(22, 131, 155, 0.5);
  }

  .questionModal .modal-card header,
  .questionModal .modal-card footer {
    background-color: rgba(22, 131, 155, 0.5);
  }

  .questionModal .modal-card section {
    background-color: rgba(11, 126, 152, 0.22);
    display: flex;
    flex-direction: column;
  }

  .questionModal.solved [name="title"]::before {
    content: "[solved] ";
    color: hsl(0, 0%, 71%);
  }

  .questionModal [name="solves"]:not(:empty)::before {
    content: "solves: ";
  }

  .questionModal [name="solves"] {
    flex-grow: 1;
  }

  .questionModal [name="category"]:not(:empty)::before {
    content: ": ";
  }

  .questionModal [name="value"]::after {
    content: " pts";
  }

  .questionModal:not(.solved) [name="value"] {
    transition: color 0.5s;
  }

  .questionModal [name="value"].solved,
  .questionModal.solved [name="value"] {
    color: green;
  }

  /* .questionModal iframe  */
  .questionModal [name="description"] {
    width: 100%;
    flex-grow: 1;

    font-family: Hack, monospace;
    cursor: pointer;
    color: white;

    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .questionModal [name="description"],
  .questionModal [name="description"] * {
    user-select: text;
  }
</style>

<div class="questionModal" transition:fade={{ duration: 200 }} class:solved>
  <div class="modal-background" on:click={close} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-light">
        <span name="title">{title}</span>
        <span class="has-text-grey-light" name="category">{category}</span>
      </p>
      <button class="delete cancel" aria-label="close" on:click={close} />
    </header>
    <section class="modal-card-body">
      <p name="description">{description}</p>
      <!-- <iframe name="description" sandbox seamless></iframe> -->
      <form on:submit|preventDefault={submitFlag}>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input blueBox has-text-centered has-text-light"
              name="flag"
              type="text"
              placeholder="FLAG{'...'}"
              spellcheck="false"
              bind:value={flagValue}
              disabled={!submissionEnabled} />
          </p>
          <p class="control">
            <button
              type="submit"
              class="button"
              class:is-loading={!submissionEnabled}>
              SUBMIT
            </button>
          </p>
        </div>
      </form>
    </section>
    <footer class="modal-card-foot has-text-light">
      <span name="solves" />
      <div name="value" class:solved>{points}</div>
    </footer>
  </div>
</div>
