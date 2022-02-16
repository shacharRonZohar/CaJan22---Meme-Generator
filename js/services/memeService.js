'use strict'
var gImgs = [{ id: 1, keywords: ['funny', 'cat'] }];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 20,
        fontSize: 48,
        align: 'center',
        color: 'red'
    }]
}

// Getters
function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

// Setters
function setMemeImg(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}