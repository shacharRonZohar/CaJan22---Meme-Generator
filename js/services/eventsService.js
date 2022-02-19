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
        },
        {
            id: 10,
            selec: '.random-meme',
            evType: 'click',
            funcToActPoint: onRandomMeme,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        }, {
            id: 11,
            selec: '.save-meme',
            evType: 'click',
            funcToActPoint: onSaveMeme,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        },
        {
            id: 12,
            selec: '.link-gallery',
            evType: 'click',
            funcToActPoint: showGallery,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        },
        {
            id: 13,
            selec: '.link-memes',
            evType: 'click',
            funcToActPoint: onShowMemes,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: false
        },
        {
            id: 14,
            selec: '.input-search',
            evType: 'input',
            funcToActPoint: onSearch,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        }, {
            id: 15,
            selec: elCanvas,
            evType: 'mousedown',
            funcToActPoint: onMouseDownCanvas,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        },
        {
            id: 16,
            selec: elCanvas,
            evType: 'mousemove',
            funcToActPoint: onMove,
            funcParams: {
                elCanvas,
                canvasCtx
            },
            isSendEv: true
        },
        {
            id: 17,
            selec: elCanvas,
            evType: 'mouseup',
            funcToActPoint: onMouseUpCanvas,
            funcParams: null,
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
    })
    _addControlsEventListeners(elCanvas, canvasCtx)
}

function addEventListenerToEl({ selec, evType, funcToActPoint, funcParams, isSendEv }) {
    // selec = selector,
    // evType = what type of listener to add, ie 'click' 'change'
    // funcToActPoint = the function to be called by the listener
    // funcParams = the params for the function called by the listener
    // isSendEv = should the funcToAct recieve the ev as a param

    const el = (typeof selec !== 'string') ? selec : document.querySelector(selec)
    const funcToAct = isSendEv ? (ev) => funcToActPoint(ev, funcParams) : (ev) => funcToActPoint(funcParams)

    // @CR-Q what the fuck is this? I had a weird error and was too lazy to rummage through the debugger
    // so google told me to do this to catch errors, and it works I think, but I have no idea what it actually does...
    // Better version of unit tests?
    // var isError = false
    // try {
    //     el.addEventListener(evType, (ev) => {
    //         funcToAct(ev)
    //     })
    // } catch (error) {
    //     console.log(error, `selec: ${selec}`, `el: ${el}`)
    //     isError = true
    // }
    // if (!isError) 
    el.addEventListener(evType, (ev) => {
        funcToAct(ev)
    })
}


//TODO: Continue Refactor
function addImgsEventListeners(elCanvas, canvasCtx) {
    // Opens the editor when an img is pressed
    const elGallery = document.querySelector('.main-gallery-container')
    elGallery.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            setTimeout(showMemeEditor, 1, elCanvas, canvasCtx)
        })
    })
}

function _addControlsEventListeners(elCanvas, canvasCtx) {
    _addChangeFontSizeListeners(elCanvas, canvasCtx)
    _addChangeAlignListeners(elCanvas, canvasCtx)
    _addMoveTextListeners(elCanvas, canvasCtx)
    addImgsEventListeners(elCanvas, canvasCtx)
}

function _addChangeFontSizeListeners(elCanvas, canvasCtx) {
    document.querySelector('.increase-font-size').addEventListener('click', () => {
        onChangeFontSize(1, elCanvas, canvasCtx, )
        renderMeme(elCanvas, canvasCtx)
    })
    document.querySelector('.decrease-font-size').addEventListener('click', () => {
        onChangeFontSize(-1, elCanvas, canvasCtx, )
        renderMeme(elCanvas, canvasCtx)
    })
}

function _addChangeAlignListeners(elCanvas, canvasCtx) {
    const opts = ['left', 'center', 'right']
    document.querySelectorAll('.text-align').forEach((currBtn, currIdx) => {
        currBtn.addEventListener('click', () => {
            onSetAlign(elCanvas, canvasCtx, opts[currIdx])
            renderMeme(elCanvas, canvasCtx)
        })
    })
}

function _addMoveTextListeners(elCanvas, canvasCtx) {
    // console.log('document.querySelector()', document.querySelector('.move-text-up'))

    document.querySelector('.move-text-up').addEventListener('click', () => {
        onMoveText(elCanvas, canvasCtx, -5)
        renderMeme(elCanvas, canvasCtx)
    })
    document.querySelector('.move-text-down').addEventListener('click', () => {
        onMoveText(elCanvas, canvasCtx, 5)
        renderMeme(elCanvas, canvasCtx)
    })
}