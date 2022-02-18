'use strict'

function renderGallery() {
    document.querySelector('.main-editor-container').classList.remove('open')
    const elGallContainer = document.querySelector('.main-gallery-container')
    getImgs().forEach(img => {
        elGallContainer.innerHTML +=
            `<div class="img-container gallery-article" onclick="onImgClicked(${img.id})">
            <img src="assets/meme-imgs/${img.id}.jpg"/></div>`

    })
}

function onImgClicked(id) {
    closeGallery()
    setMemeImg(id)
}

function closeGallery() {
    document.querySelector('.main-gallery-container').classList.remove('open')
    document.querySelector('.main-gallery-nav').style.display = 'none'
        // showMemeEditor()
}

function onRandomMeme({ elCanvas, canvasCtx }) {
    closeGallery()
    showMemeEditor(elCanvas, canvasCtx, true)
}