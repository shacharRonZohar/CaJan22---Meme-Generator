'use strict'

function init() {
    const elCanvas = document.querySelector('#main-canvas')
    const canvasCtx = document.querySelector('#main-canvas').getContext('2d')
    _addEventListeners(elCanvas, canvasCtx)
    resizeCanvas(elCanvas)
    renderMeme(elCanvas, canvasCtx)
}

function renderMeme(elCanvas, canvasCtx) {
    const meme = getMeme()
    loadImageToCanvas(_getMemeParams(meme), elCanvas, canvasCtx)
}

function loadImageToCanvas({ src }, elCanvas, canvasCtx) {


    // Render on canvas
    var img = new Image()
    img.onload = renderImgOnCanvas.bind(null, img, elCanvas, canvasCtx)
    img.src = src

}

function renderImgOnCanvas(img, elCanvas, ctx) {
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    const initPos = {
        x: 100,
        y: 100
    }
    drawText(ctx, 'Test', initPos)
}


function drawText(canvasCtx, text, { x, y }) {
    canvasCtx.font = '48px serif';
    canvasCtx.fillText(text, x, y);
    // canvasCtx.lineWidth = 10;
    // canvasCtx.strokeStyle = 'brown';
    // canvasCtx.fillStyle = 'black';
    // canvasCtx.font = '20px Arial';
    // canvasCtx.fillText(text, x, y);
    // canvasCtx.strokeText(text, x, y);
}

function resizeCanvas(elCanvas) {
    const elCanvasContainer = document.querySelector('.main-canvas-container')
    elCanvas.height = elCanvasContainer.offsetHeight
    elCanvas.width = elCanvasContainer.offsetWidth
}

function _getMemeParams(meme) {
    console.log('meme', meme)
    return {
        src: `assets/meme-imgs/${meme.selectedImgId}.jpg`,
    }
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