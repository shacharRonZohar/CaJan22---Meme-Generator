'use strict'

function showGallery({ elCanvas, canvasCtx }, isMemes) {
    hideMemeEditor()
    renderGallery(isMemes)
    if (!isMemes) addImgsEventListeners(elCanvas, canvasCtx)
}

function renderGallery(isMemes) {
    document.querySelector('.main-gallery-nav').style.display = 'flex'
    const elGallContainer = document.querySelector('.main-gallery-container')
    elGallContainer.innerHTML = ''
    elGallContainer.classList.add('open')
    const imgs = isMemes ? getMemesFromStorage() : getImgs()
    imgs.forEach(img => {
        console.log('img', img)
        const imgSrc = isMemes ? img : `assets/meme-imgs/${img.id}.jpg`
        elGallContainer.innerHTML +=
            `<div class="img-container gallery-article" onclick="onImgClicked(${img.id})">
            <img src="${imgSrc}"/></div>`

    })
}

function onImgClicked(id) {
    closeGallery()
    setMemeImg(id)
}

function onSearch(ev) {
    setFilter(ev.srcElement.value)
    renderGallery(false)
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

function onShowMemes(galleryParams) {
    showGallery(galleryParams, true)
}