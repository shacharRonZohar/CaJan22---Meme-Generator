'use strict'

function showMemeEditor(elCanvas, canvasCtx, isRandom) {
    document.querySelector('.main-content-container').classList.add('meme-mode')
    document.querySelector('.main-editor-container').style.display = 'grid'
    onResizeCanvas({ elCanvas, canvasCtx })
    setMeme(isRandom)
    renderMeme(elCanvas, canvasCtx)
}

function renderMeme(elCanvas, canvasCtx, isDownload) {
    // console.log('isDownload', isDownload)

    const meme = getMeme()
    loadImageToCanvas(meme, elCanvas, canvasCtx, isDownload)
}

function loadImageToCanvas(meme, elCanvas, canvasCtx, isDownload) {
    // Render on canvas
    var img = new Image()
    img.onload = renderImgOnCanvas.bind(null, img, elCanvas, canvasCtx, meme, isDownload)
    img.src = `assets/meme-imgs/${meme.selectedImgId}.jpg`

}

function renderImgOnCanvas(img, elCanvas, ctx, { lines }, isDownload = false) {
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    lines.forEach((line, currIdx) => {
        if (!line.pos.y) {
            line.pos.y = elCanvas.height / 2
            if (!currIdx) line.pos.y = 100
            else if (currIdx === 1) line.pos.y = elCanvas.height - 100
        }
        drawText(currIdx, elCanvas, ctx, line, line.pos)
        if (!isDownload && currIdx === getCurrLineIdx()) {
            console.log('isDownload', isDownload)
            drawRectAroundText(getLineRectParams(currIdx))
        }
    })
}

function onCycleLine({ elCanvas, canvasCtx }) {
    cycleLine()
    switchTextInput()
    renderMeme(elCanvas, canvasCtx)
}

function switchTextInput() {
    const currMeme = getMeme()
    const txtValue = (currMeme.lines[getCurrLineIdx()].txt) ? currMeme.lines[getCurrLineIdx()].txt : ''
    document.querySelector('.line-text').value = txtValue
}

function onCanvasClick(ev, { elCanvas, canvasCtx }) {
    if (isLineClicked(getEvPos(ev))) {
        switchTextInput()
        document.querySelector('.line-text').focus()
        renderMeme(elCanvas, canvasCtx)
    }
}

function onSetLineTxt(ev, { elCanvas, canvasCtx }) {
    setLineTxt(ev.srcElement.value)
    renderMeme(elCanvas, canvasCtx)
}

function onSetTxtSecndColor(ev, { elCanvas, canvasCtx }) {
    setTxtSecndColor(ev.srcElement.value)
    renderMeme(elCanvas, canvasCtx)
}

function getEvPos(ev) {
    var pos = {
            x: ev.offsetX,
            y: ev.offsetY
        }
        // if (gTouchEvs.includes(ev.type)) {
        //     ev.preventDefault()
        //     ev = ev.changedTouches[0]
        //     pos = {
        //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        //     }
        // }
    return pos
}

function onChangeFontSize(diff, elCanvas, canvasCtx) {
    changeFontSize(diff)
    renderMeme(elCanvas, canvasCtx)
}

function onFontChange(ev, { elCanvas, canvasCtx }) {
    setFont(ev.srcElement.value)
    renderMeme(elCanvas, canvasCtx)
}

function onSetAlign(elCavnas, canvasCtx, align) {
    setAlign(align)
    renderMeme(elCavnas, canvasCtx)
}

function onMoveText(elCanvas, canvasCtx, diff) {
    setTextY(diff)
    renderMeme(elCanvas, canvasCtx)
}

function onSetTxtMainColor(ev, { elCanvas, canvasCtx }) {
    setTxtMainColor(ev.srcElement.value)
    renderMeme(elCanvas, canvasCtx)
}

function onAddLine({ elCanvas, canvasCtx }) {
    getLine()
    renderMeme(elCanvas, canvasCtx)
}

function onRemoveCurrLine({ elCanvas, canvasCtx }) {
    removeCurrLine()
    if (!getMeme().lines.length) renderMeme(elCanvas, canvasCtx)
    else onCycleLine({ elCanvas, canvasCtx })
}

function onDownloadMeme(ev, { elCanvas, canvasCtx }) {
    renderMeme(elCanvas, canvasCtx, true)
    const elLink = ev.srcElement
    const data = elCanvas.toDataURL('image/png')
    elLink.download = 'my-meme'
    elLink.href = data
        // ev.preventDefault()
}

function drawText(currIdx, elCanvas, canvasCtx, { size, font, fontSize, align, mainColor, secndColor, txt, pos }) {
    pos.x = _getCoordX(elCanvas, align)
    const currFont = `${fontSize}px ${font}`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size / 10
    canvasCtx.textAlign = align
    canvasCtx.textBaseline = 'top'
    canvasCtx.strokeStyle = secndColor
    canvasCtx.fillStyle = mainColor
    canvasCtx.fillText(txt, pos.x, pos.y)
    canvasCtx.strokeStyle = secndColor
    canvasCtx.strokeText(txt, pos.x, pos.y)
    onSetTextRectParams(currIdx, elCanvas, canvasCtx, txt, pos, fontSize)
}

function onSetTextRectParams(currIdx, elCanvas, canvasCtx, txt, pos, fontSize) {
    const textWidth = canvasCtx.measureText(txt).width
    const params = {
        elCanvas,
        canvasCtx,
        textWidth,
        rectStartX: pos.x - (textWidth / 2) - 5,
        rectEndX: textWidth + 10,
        rectStartY: pos.y - 5,
        rectEndY: fontSize * 1.286 + 5,
    }
    const currLineAlign = getLineAlign(currIdx)
    if (currLineAlign === 'left') {
        params.rectStartX = 10
    } else if (currLineAlign === 'right') {
        params.rectStartX = elCanvas.width - textWidth - 10
    }
    setTextRectParams(currIdx, params)
}

function drawRectAroundText({ elCanvas, canvasCtx, rectStartX, rectStartY, rectEndX, rectEndY }) {
    canvasCtx.strokeStyle = 'black'
    canvasCtx.strokeRect(rectStartX, rectStartY, rectEndX, rectEndY)
}

function _getCoordX(elCanvas, align) {
    switch (align) {
        case 'left':
            return 10
        case 'center':
            return elCanvas.width / 2
        case 'right':
            return elCanvas.width - 10
    }
}