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

var gMeme = {}

// Getters
function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx
}

function getLineRectParams(idx) {
    return gMeme.lines[idx].textRectParams
}

function getLineAlign(idx) {
    return gMeme.lines[idx].align
}

function generateMeme(isRandom) {
    return {

        selectedImgId: isRandom ? getRandomInt(0, gImgs.length) : gMeme.selectedImgId,
        selectedLineIdx: 0,
        lines: isRandom ? getLines(getRandomInt(1, 3)) : getLines(2)
    }
}

function getLineParams(isRandom) {
    const textSize = isRandom ? getRandomInt(5, 21) : 20
    return {
        txt: isRandom ? getRandomTxt() : 'Enter your text here',
        font: isRandom ? getRandomFont() : 'impact',
        size: textSize,
        fontSize: isRandom ? textSize + 28 : 48,
        align: 'center',
        mainColor: isRandom ? getRandomColor() : 'white',
        secndColor: isRandom ? getRandomColor() : 'black',
        pos: {
            x: 0,
            y: 0
        }
    }
}

function getLines(numOfLines, isRandom) {
    var lines = []
    for (let i = 0; i < numOfLines; i++) {
        lines.push(getLine(getLineParams(isRandom)))
    }
    return lines
}

function getLine({ txt, font, fontSize, size, align, mainColor, secndColor, pos }) {
    return {
        txt,
        font,
        fontSize,
        size,
        align,
        mainColor,
        secndColor,
        pos
    }
}

function addLine() {
    gMeme.lines.push(getLine(getLineParams(false)))
}
// Setters
function setMeme(isRandom) {
    gMeme = generateMeme(isRandom)
}

function setMemeImg(id) {
    console.log('id', id)

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

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setTextY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

function setTextRectParams(lineIdx, params) {
    gMeme.lines[lineIdx].textRectParams = params
    setTextRectCoords(lineIdx, params)
}

function setTextRectCoords(lineIdx, { rectStartX, rectEndX, rectStartY, rectEndY }) {
    gMeme.lines[lineIdx].textRectCoords = {
        rectStartX,
        rectEndX: rectStartX + rectEndX,
        rectStartY,
        rectEndY: rectStartY + rectEndY
    }
}

function setTxtSecndColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].secndColor = color
}

// Changers
function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
}

function cycleLine() {
    return (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0 : ++gMeme.selectedLineIdx
}

function removeCurrLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}


// Checkers
function isLineClicked({ x, y }) {
    var isLine = false
    gMeme.lines.forEach(({ textRectCoords }, currIdx) => {
        if (x >= textRectCoords.rectStartX && x <= textRectCoords.rectEndX &&
            y >= textRectCoords.rectStartY && y <= textRectCoords.rectEndY) {
            gMeme.selectedLineIdx = currIdx
            isLine = true
        }
    })
    return isLine
}