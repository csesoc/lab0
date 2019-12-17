<style>
.questionModal {
  opacity: 0;
  transition: opacity 200ms;
  display: flex;
  pointer-events: none;
}

.questionModal.is-active {
  opacity: 1;
  pointer-events: all;
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

<div class="questionModal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-light">
        <span name="title"></span>
        <span class="has-text-grey-light" name="category"></span>
      </p>
      <button class="delete cancel" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <p name="description"></p>
      <!-- <iframe name="description" sandbox seamless></iframe> -->
      <form>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input blueBox has-text-centered has-text-light"
              name="flag"
              type="text"
              placeholder="FLAG{...}"
              spellcheck="false"
            />
          </p>
          <p class="control">
            <a class="button">SUBMIT</a>
          </p>
        </div>
      </form>
    </section>
    <footer class="modal-card-foot has-text-light">
      <span name="solves"></span>
      <div name="value"></div>
    </footer>
  </div>
</div>