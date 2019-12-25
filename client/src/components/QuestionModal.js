import QuestionModal from './_QuestionModal.svelte';

function createModal (props) {
  // if (typeof props === 'string') props = { title: props }

  const modal = new QuestionModal({
    target: document.body,
    props,
    intro: true
  })

  modal.$on('destroy', () => {
    modal.$destroy()
  })

  return modal.promise
}

QuestionModal.createModal = createModal

export default QuestionModal