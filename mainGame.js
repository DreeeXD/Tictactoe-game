let playerText = document.getElementById('mainText');
let restartBtn = document.getElementById('restartButton');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');


// console.log(boxes)

const text_O = "O";
const text_X = "X";
let currentPlayer = text_X;

let spaces = Array(9).fill(null);

// console.log(spaces)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const boxId = e.target.id;

    if(!spaces[boxId]){
        spaces[boxId] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerWon() !== false){
            playerText.innerText = `${currentPlayer} has won!!`;
            let winningBlocks = playerWon();

            // console.log(winningBlocks)

            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        currentPlayer = currentPlayer == text_X ? text_O : text_X;
    }
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerWon(){
    for (const condition of winningConditions){
        let [a, b, c] = condition;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart(){
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerText = 'Tic Tac Toe';

    currentPlayer = text_X;
}

startGame();
