'use strict'

function renderGallery() {
    // const imgs = 
    getImgs().forEach(img => {
        const elGallContainer = document.querySelector('.main-gallery-container')
        elGallContainer.innerHTML +=
            `<div class="img-container gallery-article" onclick="onImgClicked">
            <img src="assets/meme-imgs/${img.id}.jpg"/></div>`

    })
}

function onImgClicked() {

}

function renderGalleryItem(ev, id) {
    console.log('ev', ev)
    console.log('id', id)

}