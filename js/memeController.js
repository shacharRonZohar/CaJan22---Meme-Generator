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
    loadImageToCanvas(meme, elCanvas, canvasCtx)
}

function loadImageToCanvas(meme, elCanvas, canvasCtx) {


    // Render on canvas
    var img = new Image()
    img.onload = renderImgOnCanvas.bind(null, img, elCanvas, canvasCtx, meme)
    img.src = `assets/meme-imgs/${meme.selectedImgId}.jpg`

}

function renderImgOnCanvas(img, elCanvas, ctx, { lines }) {
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    lines.forEach(line => {
        drawText(ctx, line, { x: elCanvas.width / 2, y: 100 })
    })
}


function drawText(canvasCtx, { size, fontSize, align, color, txt }, { x, y }) {
    const currFont = `${fontSize}px serif`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size
    canvasCtx.textAlign = align
    canvasCtx.fillStyle = color
    canvasCtx.fillText(txt, x, y)
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
        lines: meme.lines
    }
}

function _addEventListeners(elCanvas, canvasCtx) {
    _addCanvasResizeListener(elCanvas, canvasCtx)
    _addLineInputListener(elCanvas, canvasCtx)
}

function _addLineInputListener(elCanvas, canvasCtx) {
    document.querySelector('#line-text').addEventListener('input', (ev) => {
        console.log('ev', ev.srcElement.value)
            // console.log('ev.this', ev.this)

        // console.log('this.value', this.value)

        setLineTxt(ev.srcElement.value)
            // console.log('gMeme', gMeme)
        console.log('getMeme()', getMeme())

        renderMeme(elCanvas, canvasCtx)
    })
}

function _addCanvasResizeListener(elCanvas, canvasCtx) {
    window.addEventListener('resize', () => {
        resizeCanvas(elCanvas)
        renderMeme(elCanvas, canvasCtx)
    })
}