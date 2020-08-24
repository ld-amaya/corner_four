// Variable Declarations 
const headerRow = document.querySelector('.HeaderRow');
const player = document.querySelector('#player');
const allCol = document.querySelectorAll('.colHead');
const playOver = document.querySelector('#playOver');
const boards= [
    [null, null, null, null, null, null,null],
    [null, null, null, null, null, null,null],
    [null, null, null, null, null, null,null],
    [null, null, null, null, null, null,null],
    [null, null, null, null, null, null,null],
    [null, null, null, null, null, null,null],
];

let msg ='';


allCol.forEach(item => {
    item.addEventListener('mouseenter',()=>{
        showGamePiece(item);
    })
    item.addEventListener('mouseleave',()=>{
        hideGamePiece(item);
    })
})

headerRow.addEventListener('click', (e) => {
    if (playOver.textContent === ''){
        const col = e.target.parentNode.id;                                         //Assign targeted rowHead parentNode ID as column
        const circle = document.createElement('div');                               //Create new element to insert circle to columns
        circle.classList.toggle(getPlayer());                                       //Get the color according to player's color
        if (row = getRowCol(col)) {                                                 //Get available td / row col if row is truthy
            row.append(circle);                                                     //Append div to td selected
            boards[row.dataset.row][row.dataset.col]= player.textContent;           //Update board array
            if (checkWinner(player.textContent,row.dataset.row,row.dataset.col)){   //Check if we have a winner
                alert (`${player.textContent} player WINS on ${msg} combinations`);
                playOver.textContent = `Game Over ${player.textContent} wins`;
            }   
            player.textContent = nextPlayer();                                      //Set the next color / player
            selectFont();
            allFilled() ? alert ('Game Over') : false;                              //Check if all squares are filled and there are no winners
        }
    }
});

function getPlayer() {                                                          //Get the current player's color to display
    return player.textContent === 'Red' ?'player1' : 'player2';
}

function nextPlayer() {                                                         //Set the next player
    return player.textContent === 'Red' ? 'Blue' : 'Red';
}

function showGamePiece(colHead){
    const circle = document.createElement('div');
    player.textContent ==='Red' ? circle.classList.toggle('playerHead1') : circle.classList.toggle('playerHead2')
    colHead.append(circle);
}

function hideGamePiece(colHead){
    if(colHead.querySelector('.playerHead1')) colHead.querySelector('.playerHead1').remove();
    if(colHead.querySelector('.playerHead2')) colHead.querySelector('.playerHead2').remove();
}

function selectFont(){
    player.classList.toggle('playerOneFont');
    player.classList.toggle('playerTwoFont');
}

function getRowCol(col){                                                        //Get the next vacant row number based on the column selected
    for (let i=(boards.length-1) ; i>=0; i--){
        const row = document.querySelector(`#r${i}${col}`);                     //Get the selected td / row and col
        try {
            if (row.innerHTML === '') return row;                                   //Return row if empty to fill with player color
        } catch {

        }
    }
    return false;                                                               //Return false or falsey if no empty td on column selected
}

//Check if all board is filled
function allFilled(){
    for (let board of boards){                                                  //Loop through every subarray in the board array
        return board.every((val) => val != null)                                //Return true if td is filled else return false
    }
}

//Check for winning combination
function checkWinner(color,row,col){
     //Check horizontal combo
     let winner= false;
     if (winner = checkHorizontalCombo(color,row)) return winner;               //Check if there is four straight colors in horizontal
     if (winner = checkVerticalCombo(color,col)) return winner;                 //Check if there is four straight colors in vertical
     if (winner = checkDiagonalCombo(color,row,col)) return winner;             //Check if there is four straight colors in diagonal
     return winner;
}

function checkHorizontalCombo(color,row){                                       //Check horizontal combination win
    let winCount = 0;
    let win = false;                                                            //Initialize win to false;
    boards[row].forEach((board)=>{                                              //loop through each board of the row selected
        if (board === color){
            winCount ++;                                                        //Add wincount if board is the same as player color
            if (winCount === 4) {
                win = true;                                                     //Assign win = true, wining combination found
                msg = "Horizontal combo";    
            }                                   //Set msg to winning combination format
        } else {
            winCount = 0;                                                       //Reset winCount if board is not the same as the player color
        }
    });
    return win;                                                                 //Return value of win
}

function checkVerticalCombo(color,col){                                         //Check vertical combination win
    let winCount = 0;
    let win = false;                                                            //Initialize win to false
    for (let row =0 ;row<boards.length;row++){
        if (boards[row][col]===color){                                          //Loop through each board of the column selected
            winCount ++;                                                         //Add winCount if board is the same as the player color
            if (winCount === 4) {
                win = true;                                                     //Assign win = true, wining combination found
                msg = "Vertical combo";                                         //Set msg to winning combination format
            }
        } else {
            winCount = 0;                                                       //Reset winCount if board is not the same as the player color
        }
    }
    return win;                                                                 //Return value of win
}

function checkDiagonalCombo(color,row,col){
    if (checkSlashPattern(color)) {
        msg = 'Diagonal slash combo';
        return true;
    }
    if (checkBackslashPattern(color)) {
        msg = 'Diagonal backslash combo';
        return true;
    }
}

function checkSlashPattern(color){                                              //Check diagonal slash combination win
    for (let row= boards.length-1; row>=0; row--){                             //Start calculating from the bottom, row=6
        for (let col = 0; col < boards[row].length; col ++){
            let nextRow = row;
            let winCount = 0;
            for (let nextCol =col; nextCol<boards[row].length; nextCol++){
                if (nextRow >= 0){
                    if (boards[nextRow][nextCol]===color){                      //Loop through each board of the column selected
                        winCount ++;                                            //Add winCount if board is the same as the player color
                        if (winCount === 4) return true;                        //Return true, wining combination found
                    } else {
                        winCount = 0;                                           //Reset winCount if board is not the same as the player color
                    }
                    nextRow --;                                                 //Go to next row
                }
            }
        }
    }
    return false;                                                               //Return false if there is no winning combination
}

function checkBackslashPattern(color){                                          //Check diagonal backslash combination win
    for (let row= 0; row< boards.length-1; row++){                              //Start calculating from the top
        for (let col = 0; col < boards[row].length; col ++){
            let nextRow = row;
            let winCount = 0;
            for (let nextCol=col; nextCol<boards[row].length; nextCol++){
                if (nextRow < boards[row].length-1){
                    if (boards[nextRow][nextCol]===color){                      //Loop through each board of the column selected
                        winCount ++;                                            //Add winCount if board is the same as the player color
                        if (winCount === 4) return true;                        //Return true, wining combination found
                    } else {
                        winCount = 0;                                           //Reset winCount if board is not the same as the player color
                    }
                    nextRow ++;                                                 //Go to next row
                }
            }
        }
    }
    return false;                                                               //Return false if there is no winning combination
}