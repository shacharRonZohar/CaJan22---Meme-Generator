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
        var currLineY = elCanvas.height / 2
        if (!currIdx) currLineY = 100
        else if (currIdx === 1) currLineY = elCanvas.height - 100
        drawText(elCanvas, ctx, line, currLineY)
    })
}

function onCycleLine() {
    cycleLine()
}

function onChangeFontSize(diff, elCanvas, canvasCtx) {
    changeFontSize(diff)
    console.log('canvasCtx', canvasCtx)

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

function drawText(elCanvas, canvasCtx, { size, font, fontSize, align, mainColor, secndColor, txt }, y) {
    const x = _getCoordX(elCanvas, align)
    const currFont = `${fontSize}px ${font}`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size / 10
    canvasCtx.textAlign = align
    canvasCtx.strokeStyle = 'white'
    canvasCtx.fillStyle = mainColor
    canvasCtx.fillText(txt, x, y)
    canvasCtx.strokeStyle = secndColor
    canvasCtx.strokeText(txt, x, y)
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