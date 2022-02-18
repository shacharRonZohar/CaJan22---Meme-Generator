'use strict'
const EVENTS = {
    singularEvents: [],
    groupEvents: []
}

function setEvents(elCanvas, canvasCtx) {
    EVENTS.singularEvents = [{
            id: 0,
            selec: elCanvas,
            evType: 'click',
            funcToActPoint: onCanvasClick,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        }, {
            id: 1,
            selec: '.line-text',
            evType: 'input',
            funcToActPoint: onSetLineTxt,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true

        }, {
            id: 2,
            selec: window,
            evType: 'resize',
            funcToActPoint: onResizeCanvas,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false

        }, {
            id: 3,
            selec: '.switch-line',
            evType: 'click',
            funcToActPoint: onCycleLine,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        }, {
            id: 4,
            selec: '.main-color-picker',
            evType: 'input',
            funcToActPoint: onSetTxtMainColor,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        },
        {
            id: 5,
            selec: '.font-picker',
            evType: 'change',
            funcToActPoint: onFontChange,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        },
        {
            id: 6,
            selec: '.remove-line',
            evType: 'click',
            funcToActPoint: onRemoveCurrLine,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        },
        {
            id: 7,
            selec: '.add-line',
            evType: 'click',
            funcToActPoint: onAddLine,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        },
        {
            id: 8,
            selec: '.download-meme',
            evType: 'click',
            funcToActPoint: onDownloadMeme,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        },
        {
            id: 9,
            selec: '.secnd-color-picker',
            evType: 'input',
            funcToActPoint: onSetTxtSecndColor,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        }
    ]
}

function getAllEvents() {
    return EVENTS
}

function _addEventListeners(elCanvas, canvasCtx) {
    const events = getAllEvents(elCanvas, canvasCtx)
    events.singularEvents.forEach(currEvent => {
        addEventListenerToEl(currEvent)
    });
    _addControlsEventListeners(elCanvas, canvasCtx)
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

    el.addEventListener(evType, (ev) => {
        funcToAct(ev)
    })
}


//TODO: Continue Refactor
function _addControlsEventListeners(elCanvas, canvasCtx) {
    _addChangeFontSizeListeners(elCanvas, canvasCtx)
    _addChangeAlignListeners(elCanvas, canvasCtx)
    _addMoveTextListeners(elCanvas, canvasCtx)
    _addImgsEventListeners(elCanvas, canvasCtx)
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

function _addMoveTextListeners(elCanvas, canvasCtx) {
    // console.log('document.querySelector()', document.querySelector('.move-text-up'))

    document.querySelector('.move-text-up').addEventListener('click', () => {
        onMoveText(elCanvas, canvasCtx, -5)
    })
    document.querySelector('.move-text-down').addEventListener('click', () => {
        onMoveText(elCanvas, canvasCtx, 5)
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