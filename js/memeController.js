'use strict'


function init() {
    const elCanvas = document.querySelector('#main-canvas')
    const canvasCtx = document.querySelector('#main-canvas').getContext('2d')
    _addEventListeners(elCanvas, canvasCtx)
    resizeCanvas(elCanvas)
    renderMeme(elCanvas, canvasCtx)
}

function renderMeme(elCanvas, canvasCtx) {
    loadImageToCanvas('assets/meme-imgs/1.jpg', renderImgOnCanvas, elCanvas, canvasCtx)

}

// function renderCanvas(elCanvas, canvasCtx) {
//     canvasCtx.save()
//     canvasCtx.fillStyle = "red"
//     canvasCtx.fillRect(0, 0, elCanvas.width, elCanvas.height)
//     canvasCtx.restore()
// }

function onImgInput() {

}

function loadImageToCanvas(src, onImageReady, elCanvas, canvasCtx) {
    // console.log('src', src)
    // console.log('onImageReady', onImageReady)
    // console.log('canvasCtx', canvasCtx)

    // document.querySelector('.share-container').innerHTML = ''
    // var reader = new FileReader()

    // reader.onload = function(event) {
    // console.log('onload');
    var img = new Image()
        // Render on canvas
    img.onload = onImageReady.bind(null, img, elCanvas, canvasCtx)
    img.src = src
        // gImg = img
        // }
        // console.log('after');
        // reader.readAsDataURL(ev.target.files[0])
}

function resizeCanvas(elCanvas) {
    const elCanvasContainer = document.querySelector('.main-canvas-container')
    elCanvas.height = elCanvasContainer.offsetHeight
    elCanvas.width = elCanvasContainer.offsetWidth
}

function _addEventListeners(elCanvas, canvasCtx) {
    _addCanvasResizeListener(elCanvas, canvasCtx)
}

function _addCanvasResizeListener(elCanvas, canvasCtx) {
    window.addEventListener('resize', () => {
        resizeCanvas(elCanvas)
        renderMeme(elCanvas, canvasCtx)
    })
}