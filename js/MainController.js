'use strict'

// TODO: Possible fix for making canvas dynamic:
// Making TONS of media queries and forcing the canvas container
// to a specific valid height and width

function init() {
    _setInitElVisibility()
    const elCanvas = document.querySelector('#main-canvas')
    const canvasCtx = document.querySelector('#main-canvas').getContext('2d')
    setEvents(elCanvas, canvasCtx)
    renderGallery()
    _addEventListeners(elCanvas, canvasCtx)
}

function onResizeCanvas({ elCanvas, canvasCtx }) {
    const elCanvasContainer = document.querySelector('.main-canvas-container')
    elCanvasContainer.style.height = `${elCanvasContainer.offsetWidth }px`
    elCanvas.height = elCanvas.width = elCanvasContainer.offsetWidth

    if (getMeme().selectedImgId !== undefined) renderMeme(elCanvas, canvasCtx)
}

function _setInitElVisibility() {
    document.querySelector('.main-editor-container').style.display = 'none'
}