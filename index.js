let startButton = document.querySelector('#start')
let gameBox = document.querySelector('.game')
let timeCounter = document.querySelector('#time')
let resultCounter = document.querySelector('#result')
let timeHeader = document.querySelector('#time-header')
let resultHeader = document.querySelector('#result-header')
let inputTime = document.querySelector('#game-time')



let score = 0
let isGameStarted = false

startButton.addEventListener('click', startGame)
gameBox.addEventListener('click', handleBoxClick)
inputTime.addEventListener('input', timer)
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


    renderBox()
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
function renderBox() {
    gameBox.innerHTML = ''

    let box = document.createElement('div')
    let boxSize = getRandom(30,100)
    let gameSize = gameBox.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColor()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')
    gameBox.insertAdjacentElement("afterbegin", box)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function timer(amount){
    if (amount === 'default') {
        return timeCounter.textContent =  "5.0"
    } else {
        timeCounter.textContent = inputTime.value + '.0'
    }
}

function setScore() {
    resultCounter.textContent = score.toString()
    score = 0
}

function  getRandom(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function getRandomColor () {
    return "#" + (Math.floor(Math.random() * 16777215)).toString(16)
}