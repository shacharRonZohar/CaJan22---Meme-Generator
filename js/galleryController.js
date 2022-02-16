'use strict'

function renderGallery() {
    // const imgs = 
    getImgs().forEach(img => {
            // elImg.src = `assets/meme-imgs/${img.id}.jpg`
            const elGallContainer = document.querySelector('.main-gallery-container')
            elGallContainer.innerHTML +=
                `<div class="img-container gallery-article" onclick="onImgClicked">
            <img src="assets/meme-imgs/${img.id}.jpg"/></div>`
                // elImg.onload = renderGalleryItem.bind(event, img.id)
                // console.log('elImg', elImg)

        })
        // console.log('imgs', imgs)

}

function onImgClicked() {

}

function renderGalleryItem(ev, id) {
    console.log('ev', ev)
    console.log('id', id)

}