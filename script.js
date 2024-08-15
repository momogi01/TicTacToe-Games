const player_x = 'x'
const player_o = 'circle'
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const boardElements = document.getElementById('board')
const winningMessageElement = document.getElementById('winMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let isPlayer_o_Turn

startGame ()

restartButton.addEventListener('click', startGame)

function startGame() {
    isPlayer_o_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(player_x)
        cell.classList.remove(player_o)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, { once:true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleCellClick (e) {
    const cell = e.target
    const currentClass = isPlayer_o_Turn ? player_o : player_x
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${isPlayer_o_Turn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(player_x) || cell.classList.contains(player_o)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    isPlayer_o_Turn = !isPlayer_o_Turn
}

function setBoardHoverClass() {
    boardElements.classList.remove(player_x)
    boardElements.classList.remove(player_o)
    if(isPlayer_o_Turn) {
        boardElements.classList.add(player_o)
    } else {
        boardElements.classList.add(player_x)
    }
}

function checkWin(currentClass) {
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}