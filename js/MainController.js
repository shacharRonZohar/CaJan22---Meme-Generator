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
    elCanvas.height = elCanvas.width = elCanvasContainer.offsetWidth

    try {
        getMeme().lines.forEach((line, currIdx) => {
            const fontSize = elCanvasContainer.offsetWidth * 0.08
            setTextFontSize(currIdx, fontSize)
            resetTxtPosY(currIdx)
        })
    } catch {
        console.log('Caught you Too!')
            // console.log('elCanvasContainer.offsetWidth', elCanvasContainer.offsetWidth)
    } finally {
        // console.log('offsetWidth', elCanvasContainer.offsetWidth)

    }
    if (getMeme().selectedImgId !== undefined) renderMeme(elCanvas, canvasCtx)
}

function toggleMenu() {
    document.querySelector('header nav').classList.toggle('menu-open');
}

function _setInitElVisibility() {
    document.querySelector('.main-editor-container').classList.remove('open')
}