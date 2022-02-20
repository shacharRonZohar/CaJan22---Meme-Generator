'use strict'

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
    elCanvas.height = elCanvas.width = elCanvasContainer.offsetWidth
    try {
        getMeme().lines.forEach((line, currIdx) => {
            const fontSize = elCanvasContainer.offsetWidth * 0.08
            setTextFontSize(currIdx, fontSize)
            resetTxtPosY(currIdx)
        })
        renderMeme(elCanvas, canvasCtx)
    } catch {
        console.log('Caught you Too!')
    }
}

function toggleMenu() {
    document.querySelector('header nav').classList.toggle('menu-open');
}

function _setInitElVisibility() {
    document.querySelector('.main-editor-container').classList.remove('open')
}