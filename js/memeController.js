'use strict'

function showMemeEditor(elCanvas, canvasCtx) {
    document.querySelector('.main-content-container').classList.add('meme-mode')
    document.querySelector('.main-editor-container').style.display = 'grid'
    resizeCanvas(elCanvas)
    renderMeme(elCanvas, canvasCtx)
}

function renderMeme(elCanvas, canvasCtx) {
    const meme = getMeme()
    loadImageToCanvas(meme, elCanvas, canvasCtx)
}

function loadImageToCanvas(meme, elCanvas, canvasCtx) {
    // Render on canvas
    var img = new Image()
    img.onload = renderImgOnCanvas.bind(null, img, elCanvas, canvasCtx, meme)
    img.src = `assets/meme-imgs/${meme.selectedImgId}.jpg`

}

function renderImgOnCanvas(img, elCanvas, ctx, { lines }) {
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    lines.forEach((line, currIdx) => {
        if (!line.pos.y) {
            line.pos.y = elCanvas.height / 2
            if (!currIdx) line.pos.y = 100
            else if (currIdx === 1) line.pos.y = elCanvas.height - 100
        }
        drawText(currIdx, elCanvas, ctx, line, line.pos)
        if (currIdx === getCurrLineIdx()) {
            drawRectAroundText(getLineRectParams(currIdx))
        }
    })
}

function onCycleLine(elCanvas, canvasCtx) {
    cycleLine()
    renderMeme(elCanvas, canvasCtx)
}

function onCanvasClick(elCanvas, canvasCtx, ev) {
    isLineClicked(ev)
}

function onChangeFontSize(diff, elCanvas, canvasCtx) {
    changeFontSize(diff)
    renderMeme(elCanvas, canvasCtx)
}

function onFontChange(elCanvas, canvasCtx, font) {
    setFont(font)
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

function drawText(currIdx, elCanvas, canvasCtx, { size, font, fontSize, align, mainColor, secndColor, txt, pos }) {
    pos.x = _getCoordX(elCanvas, align)
    const currFont = `${fontSize}px ${font}`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size / 10
    canvasCtx.textAlign = align
    canvasCtx.textBaseline = 'top'
    canvasCtx.strokeStyle = 'white'
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

    //Handeling of Rect
    canvasCtx.strokeStyle = 'black'
    canvasCtx.strokeRect(rectStartX, rectStartY, rectEndX, rectEndY)
        // renderMeme(elCanvas, canvasCtx)
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