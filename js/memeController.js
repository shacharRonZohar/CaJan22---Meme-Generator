'use strict'


function init() {
    const elCanvas = document.querySelector('#main-canvas')
    const canvasCtx = document.querySelector('#main-canvas').getContext('2d')
    _addEventListeners(elCanvas, canvasCtx)
    resizeCanvas(elCanvas)
}


function renderCanvas(elCanvas, canvasCtx) {
    canvasCtx.save()
    canvasCtx.fillStyle = "red"
    canvasCtx.fillRect(0, 0, elCanvas.width, elCanvas.height)
        // renderCircle()
    canvasCtx.restore()
}

function resizeCanvas(elCanvas) {
    // console.log('elCanvas', elCanvas)

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
        renderCanvas(elCanvas, canvasCtx)
    })
}