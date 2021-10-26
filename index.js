let startButton = document.querySelector('#start')
let gameBox = document.querySelector('.game')
let timeCounter = document.querySelector('#time')
let resultCounter = document.querySelector('#result')
let timeHeader = document.querySelector('#time-header')
let resultHeader = document.querySelector('#result-header')
let inputTime = document.querySelector('#game-time')
let setTime = document.querySelector("#checkbox")

class RootElement {
    constructor(tagName = 'div') {
        this.$element = document.createElement(tagName)
    }
}

class Box extends RootElement {
    constructor(tagName){
        super(tagName)
    }
    renderBox(gameSize, element){
        element.innerHTML=''
        let boxSize = getRandom(30,100)
        let maxTop = gameSize.height - boxSize
        let maxLeft = gameSize.width - boxSize
        this.$element.style.height = this.$element.style.width = boxSize + 'px'
        this.$element.style.position = 'absolute'
        this.$element.style.backgroundColor = getRandomColor()
        this.$element.style.top = getRandom(0, maxTop) + 'px'
        this.$element.style.left = getRandom(0, maxLeft) + 'px'
        this.$element.style.cursor = 'pointer'
        this.$element.style.border = '1px solid #ccc'
        this.$element.setAttribute('data-box', 'true')
        element.insertAdjacentElement('afterbegin', this.$element)
    }

}


let score = 0
let isGameStarted = false
let defaultTime = '5.0'
let gameSize = gameBox.getBoundingClientRect()
const renderer = new Box("div")

startButton.addEventListener('click', startGame)
gameBox.addEventListener('click', handleBoxClick)
inputTime.addEventListener('input', timer)
setTime.addEventListener('input', changeDefault)

function show(el) {
    el.classList.remove('hide')
}

function hide(el) {
    el.classList.add('hide')
}
function startGame() {
    inputTime.disabled = true
    show(timeHeader)
    hide(resultHeader)
    isGameStarted = true
    hide(startButton)
    gameBox.style.background = 'transparent'

    let interval = setInterval(function () {
        let time = parseFloat(timeCounter.textContent)

        if (time <= 0){
            clearInterval(interval)
            endGame()
        } else {
            timeCounter.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)

     renderer.renderBox(gameSize, gameBox)
}

function endGame() {
    inputTime.disabled = false
    isGameStarted = false
    gameBox.innerHTML = ''
    show(startButton)
    gameBox.style.backgroundColor = '#ccc'
    hide(timeHeader)
    show(resultHeader)
    setScore()
    timer('default')
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderer.renderBox(gameSize, gameBox)
    }
}

function timer(amount){
    if (amount === 'default') {
        return timeCounter.textContent =  defaultTime
    } else {
        timeCounter.textContent = inputTime.value + '.0'
    }
}

function setScore() {
    resultCounter.textContent = score.toString()
    score = 0
}

function changeDefault(){
    if (setTime.checked){
        defaultTime = inputTime.value + '.0'
    } else {
        defaultTime = '5.0'
        inputTime.value = 5
    }
}

function  getRandom(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function getRandomColor () {
    return "#" + (Math.floor(Math.random() * 16777215)).toString(16)
}