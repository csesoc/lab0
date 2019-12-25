<script>
  export let imageURL;
  let imgElem;

  import { onMount } from "svelte";

  onMount(() => {
    fetch(imageURL)
      .then(content => content.text())
      .then(data => {
        var svgElem = new DOMParser()
          .parseFromString(data, "image/svg+xml")
          .querySelector("svg");
        svgElem.classList = imgElem.classList;
        imgElem.parentElement.replaceChild(svgElem, imgElem);
      })
      .catch(() => {
        imgElem.src = imageURL;
      });
  });
</script>

<img bind:this={imgElem} />
