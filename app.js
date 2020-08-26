//Create the game board
const WIDTH = 7;
const HEIGHT = 6;
createBoard();
// Variable Declarations 

const allCol = document.querySelectorAll('.colHead');
const player = document.querySelector('#player');
const playOver = document.querySelector('#playOver');
let boards = [];
let msg = '';

//Add event listener to hide and show game piece
allCol.forEach(item => {
    item.addEventListener('mouseenter', () => {
        showGamePiece(item);
    })
    item.addEventListener('mouseleave', () => {
        hideGamePiece(item);
    })
})

//Call function to make board
makeBoard();

// Create the game board
function createBoard() {
    const board = document.querySelector('.game');
    const rows = document.createElement('tr');

    //Create the head row
    rows.setAttribute('id', 'HeaderRow');
    rows.classList.add('row');
    rows.addEventListener('click', (e) => {
        gamePlay(e);
    });

    //Create the header column and append to header row
    for (let col = 0; col < WIDTH; col++) {
        const cols = document.createElement('td');
        cols.setAttribute('id', `c${col}`);
        cols.classList.add('colHead');
        rows.append(cols);
    }

    // Append to board
    board.append(rows);

    //Create the remaining boards
    for (let myRow = 0; myRow < HEIGHT; myRow++) {
        const row = document.createElement('tr');
        for (let myCol = 0; myCol < WIDTH; myCol++) {
            const cols = document.createElement('td');
            cols.setAttribute('id', `r${myRow}c${myCol}`);
            cols.dataset.row = myRow;
            cols.dataset.col = myCol;
            cols.classList.add('col');
            row.append(cols);
        }
        board.append(row);
    }
}

function makeBoard() {
    for (let row = 0; row < HEIGHT; row++) {
        boards.push(Array.from({
            length: WIDTH
        }));
    }
}

function gamePlay(e) {
    if (playOver.textContent === '') {
        const col = e.target.parentNode.id; //Assign targeted rowHead parentNode ID as column
        const circle = document.createElement('div'); //Create new element to insert circle to columns
        circle.classList.toggle(getPlayer()); //Get the color according to player's color
        if (row = getRowCol(col)) { //Get available td / row col if row is truthy
            row.append(circle); //Append div to td selected
            boards[row.dataset.row][row.dataset.col] = player.textContent; //Update board array
            if (checkWinner(row.dataset.row, row.dataset.col)) { //Check if we have a winner
                playOver.textContent = `${player.textContent} player WINS on ${msg}`;
                setTimeout(() => {
                    alert(playOver.textContent);
                }, 800);
            }
            player.textContent = nextPlayer(); //Set the next color / player
            selectFont();
            if (allFilled()) { //Check if all squares are filled and there are no winners
                alert('Game Tie');
                setInterval(() => {
                    playOver.textContent = 'Game Over, game tie!';
                }, 800);
            }
        }
    }
}

function getPlayer() { //Get the current player's color to display
    return player.textContent === 'Red' ? 'player1' : 'player2';
}

function nextPlayer() { //Set the next player
    return player.textContent === 'Red' ? 'Blue' : 'Red';
}

function showGamePiece(colHead) {
    const circle = document.createElement('div');
    player.textContent === 'Red' ? circle.classList.toggle('playerHead1') : circle.classList.toggle('playerHead2')
    colHead.append(circle);
}

function hideGamePiece(colHead) {
    if (colHead.querySelector('.playerHead1')) colHead.querySelector('.playerHead1').remove();
    if (colHead.querySelector('.playerHead2')) colHead.querySelector('.playerHead2').remove();
}

function selectFont() {
    player.classList.toggle('playerOneFont');
    player.classList.toggle('playerTwoFont');
}

function getRowCol(col) { //Get the next vacant row number based on the column selected
    for (let i = (boards.length - 1); i >= 0; i--) {
        const row = document.querySelector(`#r${i}${col}`); //Get the selected td / row and col
        try {
            if (row.innerHTML === '') return row; //Return row if empty to fill with player color
        } catch {

        }
    }
    return false; //Return false or falsey if no empty td on column selected
}

//Check if all last row of the board is filled
function allFilled() {
    return boards[0].every((val) => val != null) //Return true if td is filled else return false
}

//Check for winning combination
function checkWinner(row, col) {
    if (checkHorizontalWin(row)) return true;
    if (checkVerticalWin(col)) return true;
    if (checkSlashWin()) return true;
    if (checkBackslashWin()) return true;
}

//Check Horizontal Winner
function checkHorizontalWin(row) {
    for (let i = 0; i < WIDTH; i++) {
        const horizontal = [boards[row][i], boards[row][i + 1], boards[row][i + 2], boards[row][i + 3]];
        if (checkWin(horizontal)) {
            msg = 'Horizontal combination';
            return true;
        }
    }
}

//Check Vertical Winner
function checkVerticalWin(col) {
    for (let i = 0; i < HEIGHT / 2; i++) {
        const vertical = [boards[i][col], boards[i + 1][col], boards[i + 2][col], boards[i + 3][col]];
        if (checkWin(vertical)) {
            msg = 'Vertical combination'
            return true;
        }
    }
}

//Check Slash Winner
function checkSlashWin() {
    for (let col = 0; col < WIDTH; col++) {
        for (let row = HEIGHT - 1; row >= HEIGHT / 2; row--) {
            const checkSlashPattern = [boards[row][col], boards[row - 1][col + 1], boards[row - 2][col + 2], boards[row - 3][col + 3]];
            if (checkWin(checkSlashPattern)) {
                msg = 'Diagonal slash combination';
                return true;
            }
        }
    }
}

// Check Backslash Win
function checkBackslashWin() {
    for (let col = 0; col < WIDTH; col++) {
        for (let row = 0; row < HEIGHT / 2; row++) {
            const checkBackslashPattern = [boards[row][col], boards[row + 1][col + 1], boards[row + 2][col + 2], boards[row + 3][col + 3]];
            if (checkWin(checkBackslashPattern)) {
                msg = 'Diagonal Backslash combination';
                return true;
            }
        }
    }
}

//Check Winning combination
function checkWin(combination) {
    return combination.every(cell => cell === player.textContent);
}