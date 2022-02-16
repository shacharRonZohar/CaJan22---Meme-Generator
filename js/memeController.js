'use strict'

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
    lines.forEach(line => {
        drawText(ctx, line, { x: elCanvas.width / 2, y: 100 })
    })
}


function drawText(canvasCtx, { size, fontSize, align, color, txt }, { x, y }) {
    const currFont = `${fontSize}px serif`
    canvasCtx.font = currFont
    canvasCtx.lineWidth = size
    canvasCtx.textAlign = align
    canvasCtx.fillStyle = color
    canvasCtx.fillText(txt, x, y)
}