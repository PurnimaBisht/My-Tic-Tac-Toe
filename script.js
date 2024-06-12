console.log("Welcome to Tic Tac Toe");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let totalTurns = 0;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X";
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    // 2D Array 
    let wins = [                
        [0, 1, 2],     // row 1   
        [3, 4, 5],     // row 2   
        [6, 7, 8],     // row 3   
        [0, 3, 6],     // column 1    
        [1, 4, 7],     // column 2     
        [2, 5, 8],     // column 3     
        [0, 4, 8],     // diagonal 1   
        [2, 4, 6],     // diagonal 2   
    ];
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText !== "") && (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText)){
            document.querySelector('.info').innerText = "Winner is " + boxtext[e[0]].innerText;
            isgameover = true;
            gameover.play();   /* plays when there is a winner */
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    })
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if( isgameover === false && boxtext.innerText === ''){   /* no one has won the game and that box is empty */
            boxtext.innerText = turn;
            audioTurn.play();    /* plays after each turn */
            totalTurns++;
            turn = changeTurn();
            checkWin();
            if (!isgameover){
                if (totalTurns !== 9) {
                    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
                }
                else {
                    document.getElementsByClassName("info")[0].innerText  = "Draw";
                }
            }
        }
    })
})

// Reset button
reset.addEventListener('click', ()=>{                      /* when clicked on reset */
    let boxtexts = document.querySelectorAll('.boxtext');  /* selects all the boxtexts */
    Array.from(boxtexts).forEach(element => {
        element.innerText = "" ;                           /* empty all the boxtexts */
    });
    turn = "X";                                  /* game restarts, initial turn of X */
    totalTurns = 0;
    isgameover = false; 
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
})