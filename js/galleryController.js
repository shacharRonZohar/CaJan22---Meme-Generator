'use strict'

function renderGallery() {
    const elGallContainer = document.querySelector('.main-gallery-container')
    getImgs().forEach(img => {
        elGallContainer.innerHTML +=
            `<div class="img-container gallery-article" onclick="onImgClicked(${img.id})">
            <img src="assets/meme-imgs/${img.id}.jpg"/></div>`

    })
}

function onImgClicked(id) {
    console.log('id', id)
    closeGallery()

    setMemeImg(id)
}

function closeGallery() {
    document.querySelector('.main-gallery-container').style.display = 'none'
    document.querySelector('.main-gallery-nav').style.display = 'none'
}