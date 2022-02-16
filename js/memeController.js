'use strict'

function showMemeEditor(elCanvas, canvasCtx) {
    document.querySelector('.main-editor-container').style.display = 'grid'
    resizeCanvas(elCanvas)
    renderMeme(elCanvas, canvasCtx)
}

function renderMeme(elCanvas, canvasCtx) {
    console.log('elCanvas', canvasCtx)
    const meme = getMeme()
    loadImageToCanvas(meme, elCanvas, canvasCtx)
}

function loadImageToCanvas(meme, elCanvas, canvasCtx) {
    // console.log('meme', meme)

    // Render on canvas
    var img = new Image()
    img.onload = renderImgOnCanvas.bind(null, img, elCanvas, canvasCtx, meme)
    img.src = `assets/meme-imgs/${meme.selectedImgId}.jpg`

}

function renderImgOnCanvas(img, elCanvas, ctx, { lines }) {
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    lines.forEach((line, currIdx) => {
        drawText(ctx, line, { x: elCanvas.width / 2, y: 100 * (currIdx + 1) })
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

function drawText(canvasCtx, { size, fontSize, align, color, txt }, { x, y }) {
    const currFont = `${fontSize}px serif`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size
    canvasCtx.textAlign = align
    canvasCtx.fillStyle = color
    canvasCtx.fillText(txt, x, y)
}