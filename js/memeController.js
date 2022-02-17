'use strict'

function showMemeEditor(elCanvas, canvasCtx) {
    document.querySelector('.main-content-container').classList.add('gallery-mode')
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
        drawText(ctx, line, { x: elCanvas.width / 2, y: currLineY })
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

function drawText(canvasCtx, { size, fontSize, align, mainColor, secndColor, txt }, { x, y }) {
    const currFont = `${fontSize}px serif`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size / 10
    canvasCtx.textAlign = align
    console.log('mainColor', mainColor)
    console.log('secndColor', secndColor)
    canvasCtx.strokeStyle = 'white'
    canvasCtx.fillStyle = mainColor
    canvasCtx.fillText(txt, x, y)
    canvasCtx.strokeStyle = secndColor
    canvasCtx.strokeText(txt, x, y)
}