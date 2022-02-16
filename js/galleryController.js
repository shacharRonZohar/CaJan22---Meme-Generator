'use strict'

function renderGallery() {
    getImgs().forEach(img => {
        const elGallContainer = document.querySelector('.main-gallery-container')
        elGallContainer.innerHTML +=
            `<div class="img-container gallery-article" onclick="onImgClicked(${img.id})">
            <img src="assets/meme-imgs/${img.id}.jpg"/></div>`

    })
}

function onImgClicked(id) {
    console.log('id', id)
    document.querySelector('.main-gallery-container').style.display = 'none'
    document.querySelector('.main-gallery-nav').style.display = 'none'
    setMemeImg(id)
}