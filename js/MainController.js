'use strict'

function init() {
    _setInitElVisibility()
    const elCanvas = document.querySelector('#main-canvas')
    const canvasCtx = document.querySelector('#main-canvas').getContext('2d')
    renderGallery()
    _addEventListeners(elCanvas, canvasCtx)
}

function resizeCanvas(elCanvas) {
    const elCanvasContainer = document.querySelector('.main-canvas-container')
    elCanvasContainer.style.height = `${elCanvasContainer.offsetWidth }px`
    elCanvas.height = elCanvas.width = elCanvasContainer.offsetWidth
}

function _setInitElVisibility() {
    document.querySelector('.main-editor-container').style.display = 'none'
}

function _addEventListeners(elCanvas, canvasCtx) {
    _addCanvasResizeListener(elCanvas, canvasCtx)
    _addLineInputListener(elCanvas, canvasCtx)
    _addImgsEventListeners(elCanvas, canvasCtx)
    _addControlsEventListeners(elCanvas, canvasCtx)
}

function _addLineInputListener(elCanvas, canvasCtx) {
    document.querySelector('#line-text').addEventListener('input', (ev) => {
        setLineTxt(ev.srcElement.value)
        renderMeme(elCanvas, canvasCtx)
    })
}

function _addCanvasResizeListener(elCanvas, canvasCtx) {
    window.addEventListener('resize', () => {
        resizeCanvas(elCanvas)
        renderMeme(elCanvas, canvasCtx)
    })
}

function _addImgsEventListeners(elCanvas, canvasCtx) {
    // Opens the gallery when an img is pressed
    const elGallery = document.querySelector('.main-gallery-container')
    elGallery.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            setTimeout(showMemeEditor, 1, elCanvas, canvasCtx)
        })
    })
}

function _addControlsEventListeners(elCanvas, canvasCtx) {
    _addMainColorPickerListener(elCanvas, canvasCtx)
    _addChangeFontSizeListeners(elCanvas, canvasCtx)
    _addChangeAlignListeners(elCanvas, canvasCtx)
    _addChangeFontListener(elCanvas, canvasCtx)
}

function _addMainColorPickerListener(elCanvas, canvasCtx) {
    document.querySelector('#main-color-picker').addEventListener('input', (ev) => {
        setTxtMainColor(ev.srcElement.value)
        renderMeme(elCanvas, canvasCtx)
    })
}

function _addChangeFontSizeListeners(elCanvas, canvasCtx) {
    document.querySelector('.increase-font-size').addEventListener('click', () => {
        onChangeFontSize(1, elCanvas, canvasCtx, )
        renderMeme(elCanvas, canvasCtx)
    })
    document.querySelector('.decrease-font-size').addEventListener('click', () => {
        onChangeFontSize(-1, elCanvas, canvasCtx, )
    })
}

function _addChangeAlignListeners(elCanvas, canvasCtx) {
    const opts = ['left', 'center', 'right']
    document.querySelectorAll('.text-align').forEach((currBtn, currIdx) => {
        currBtn.addEventListener('click', () => {
            onSetAlign(elCanvas, canvasCtx, opts[currIdx])
        })
    })
}

function _addChangeFontListener(elCanvas, canvasCtx) {
    document.querySelector('.font-picker').addEventListener('change', (ev) => {
        onFontChange(elCanvas, canvasCtx, ev.srcElement.value)
    })
}