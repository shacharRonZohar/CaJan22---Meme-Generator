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
    const initPos = {
        x: 100,
        y: 100
    }
    drawText(canvasCtx, 'Test', initPos)
}


function onImgInput() {

}

function loadImageToCanvas(src, onImageReady, elCanvas, canvasCtx) {

    // Render on canvas
    var img = new Image()
    img.onload = onImageReady.bind(null, img, elCanvas, canvasCtx)
    img.src = src

}

function resizeCanvas(elCanvas) {
    const elCanvasContainer = document.querySelector('.main-canvas-container')
    elCanvas.height = elCanvasContainer.offsetHeight
    elCanvas.width = elCanvasContainer.offsetWidth
}

function drawText(canvasCtx, text, { x, y }) {
    console.log('text', text)
    console.log('x,y', x, y)
    console.log('canvasCtx', canvasCtx)

    canvasCtx.font = '48px serif';
    canvasCtx.fillText(text, x, y);
    // canvasCtx.lineWidth = 10;
    // canvasCtx.strokeStyle = 'brown';
    // canvasCtx.fillStyle = 'black';
    // canvasCtx.font = '20px Arial';
    // canvasCtx.fillText(text, x, y);
    // canvasCtx.strokeText(text, x, y);
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