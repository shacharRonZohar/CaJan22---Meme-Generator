'use strict'
var gImgs = [{ id: 1, keywords: ['funny', 'cat'] },
    { id: 2, keywords: ['funny', 'cat'] },

];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
            txt: 'Enter your text here',
            size: 20,
            fontSize: 48,
            align: 'center',
            color: 'red'
        },
        {
            txt: 'Enter your text here',
            size: 20,
            fontSize: 48,
            align: 'center',
            color: 'red'
        },
    ]
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
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setTxtMainColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

// Changers
function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
}

function cycleLine() {
    (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0: gMeme.selectedLineIdx++
}