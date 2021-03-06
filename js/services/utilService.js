'use strict'

function makeId(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function toggleClass(selector, className) {
    document.querySelector(`.${selector}`).classList.toggle(className)
}

function resetLocalStorage() {
    localStorage.clear()
    window.location.reload()
}

function flickerClass(selector, className) {
    toggleClass(selector, className)
    setTimeout(toggleClass, 5000, selector, className)
}

function setTextInsideParent(containerSelec, itemSelec, val) {
    $(`.${containerSelec}`).find(`.${itemSelec}`).text(val)
}

Array.prototype.autoSortObj = function(objKey, sortType, isAsc) {
    const sortDir = isAsc ? 1 : -1
    if (typeof(sortType) === 'string') return this.sort((a, b) => a[objKey].toUpperCase().localeCompare(b[objKey].toUpperCase()) * sortDir)
    else if (typeof(sortType) === 'number') return this.sort((a, b) => a[objKey] - b[objKey] * sortDir)
}

// Canvas