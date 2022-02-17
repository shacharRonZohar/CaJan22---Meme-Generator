'use strict'
var gImgs = [{ id: 1, keywords: ['funny', 'cat'] },
    { id: 2, keywords: ['funny', 'cat'] },
    { id: 3, keywords: ['funny', 'cat'] },
    { id: 4, keywords: ['funny', 'cat'] },
    { id: 5, keywords: ['funny', 'cat'] },
    { id: 6, keywords: ['funny', 'cat'] },
    { id: 7, keywords: ['funny', 'cat'] },
    { id: 8, keywords: ['funny', 'cat'] },
    { id: 9, keywords: ['funny', 'cat'] },
    { id: 10, keywords: ['funny', 'cat'] },

]

const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man, i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
            txt: 'Enter your text here',
            size: 20,
            font: 'impact',
            fontSize: 48,
            align: 'center',
            mainColor: 'white',
            secndColor: 'black'
        },
        {
            txt: 'Enter your text here',
            size: 20,
            font: 'impact',
            fontSize: 48,
            align: 'center',
            mainColor: 'white',
            secndColor: 'black'
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
    gMeme.lines[gMeme.selectedLineIdx].mainColor = color
}

function setAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}
// Changers
function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
}

function cycleLine() {
    (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0: gMeme.selectedLineIdx++
}