<style>
.slideout {
  display: none;
}

@media screen and (min-width: 1024px) {
  .slideout {
    display: inherit;
    position: absolute;
    height: 100%;
    width: 10vw;
    right: 0;
  }
}

.slideout {
  /*border-left: 2px solid rgba(22, 131, 155, 0.5);*/
  background-color: rgba(22, 131, 155, 0.2);
  transition: box-shadow 200ms;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
}

.slideout:hover {
  /*box-shadow: 0px 0px 15px 0px rgba(11, 126, 152, 0.5);*/
}

.slideout [name] {
  color: white;
}

.slideout [name="rank"]:not(:empty)::before {
  content: "rank: ";
}

.slideout [name="places"]:not(:empty)::before {
  content: "/";
}

.slideout [name="score"]:not(:empty)::before {
  content: "score: ";
}
</style>