(() => {
    let x = document.querySelector('.navbar [name=mouseCoordinates] [name=mouseX]');
    let y = document.querySelector('.navbar [name=mouseCoordinates] [name=mouseY]');

    document.body.addEventListener('mousemove', evt => {
        // var elem = document.querySelector( ".regions g:hover .mouseArea");
        // if (elem) console.log(elem.getAttribute('data-text'))
        x.innerText = evt.clientX;
        y.innerText = evt.clientY;
    })
})()