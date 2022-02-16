'use strict'

function init() {
    console.log('1')
    _setInitElVisibility()
    const elCanvas = document.querySelector('#main-canvas')
    const canvasCtx = document.querySelector('#main-canvas').getContext('2d')
    _addEventListeners(elCanvas, canvasCtx)
    resizeCanvas(elCanvas)
    renderMeme(elCanvas, canvasCtx)
}

function resizeCanvas(elCanvas) {
    const elCanvasContainer = document.querySelector('.main-canvas-container')
    elCanvas.height = elCanvasContainer.offsetHeight
    elCanvas.width = elCanvasContainer.offsetWidth
}

function _setInitElVisibility() {
    // console.log(document.querySelector('.main-editor-container').classList);
    document.querySelector('.main-editor-container').style.display = 'none'
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
        console.log('resizing')
        resizeCanvas(elCanvas)
        renderMeme(elCanvas, canvasCtx)
    })
}