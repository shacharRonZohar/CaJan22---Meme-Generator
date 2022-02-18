'use strict'

// TODO: Possible fix for making canvas dynamic:
// Making TONS of media queries and forcing the canvas container
// to a specific valid height and width

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
    const events = getAllEvents(elCanvas, canvasCtx)
    var funcParams = {
        elCanvas,
        canvasCtx
    }
    addEventListenerToEl('.switch-line', 'click', onCycleLine, funcParams, false)
    _addCanvasClickListener(elCanvas, canvasCtx)
    _addCanvasResizeListener(elCanvas, canvasCtx)
        // _addChangeLineListener(elCanvas, canvasCtx)
    _addLineInputListener(elCanvas, canvasCtx)
    _addImgsEventListeners(elCanvas, canvasCtx)
    _addControlsEventListeners(elCanvas, canvasCtx)
}

addEventListenerToEl(selec, evType, funcToActPoint, funcParams, isSendEv)

function _addCanvasClickListener(elCanvas, canvasCtx) {
    elCanvas.addEventListener('click', (ev) => {
        onCanvasClick(elCanvas, canvasCtx, ev)
    })
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

// function _addChangeLineListener(elCanvas, canvasCtx) {
//     document.querySelector('.switch-line').addEventListener('click', () => {
//         onCycleLine(elCanvas, canvasCtx)
//     })
// }

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
    _addMoveTextListeners(elCanvas, canvasCtx)
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
            // console.log('opts[currIdx', opts[currIdx])

            onSetAlign(elCanvas, canvasCtx, opts[currIdx])
        })
    })
}

function _addChangeFontListener(elCanvas, canvasCtx) {
    document.querySelector('.font-picker').addEventListener('change', (ev) => {
        onFontChange(elCanvas, canvasCtx, ev.srcElement.value)
    })
}

function _addMoveTextListeners(elCanvas, canvasCtx) {
    // console.log('document.querySelector()', document.querySelector('.move-text-up'))

    document.querySelector('.move-text-up').addEventListener('click', () => {
        onMoveText(elCanvas, canvasCtx, -5)
    })
    document.querySelector('.move-text-down').addEventListener('click', () => {
        onMoveText(elCanvas, canvasCtx, 5)
    })
}

function addEventListenerToEl({ selec, evType, funcToActPoint, funcParams, isSendEv }) {
    // selec = selector,
    // evType = what type of listener to add, ie 'click' 'change
    // funcToActPoint = the function to be called by the listener
    // funcParams = the params for the function called by the listener
    // isSendEv = should the funcToAct recieve the ev as a param

    var el, funcToAct

    if (typeof selec !== 'string') el = selec
    else el = document.querySelector(selec)

    if (isSendEv) funcToAct = (ev) => funcToActPoint(ev, funcParams)
    else funcToAct = (ev) => funcToActPoint(funcParams)

    document.querySelector(selec).addEventListener(evType, (ev) => {
        console.log('funcToAct', funcToAct)

        funcToAct(ev)
    })
}