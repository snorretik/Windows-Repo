let setUpGame = (function () {
    `use strict`;

    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let comp = false;
    let player1Name = "";
    let player2Name = "";
    let entered1 = false;
    let entered2 = false;
    let turnPlay1 = true;
    let setButtons = false;

    setEventPlayer2();
    
    const startRestartButt = document.querySelector("#startRestart");
    startRestartButt.addEventListener('click', (e) => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];

        if (comp == true) {
            comp = false;
            remOrAdd(comp);
        }

        const inputText1 = document.querySelector("#input1");
        const inputText2 = document.querySelector("#input2");

        player1Name = "";
        player2Name = "";
        inputText1.setAttribute("placeholder", "Player 1 name:");
        inputText2.setAttribute("placeholder", "Player 2 name:");

        entered1 = false;
        entered2 = false;
        turnPlay1 = true;
        setButtons = false;
        // misschien nog meer nodig...
    })

    const opponentTogg = document.querySelector("#opponentToggle");
    opponentTogg.addEventListener('click', (e) => {
        if ((entered1 == false) && (entered2 == false)) {
            comp = !comp;
            remOrAdd(comp);
        }
    })

    const getPlayerName1 = document.querySelector("#button1");
    getPlayerName1.addEventListener('click', (e) => {
        const inputText1 = document.querySelector("#input1");
        player1Name = inputText1.value;
        inputText1.setAttribute("placeholder", player1Name);
        inputText1.value = "";

        entered1 = true;
    })

    const playButton = document.querySelector("#play");
    playButton.addEventListener('click', (e) => {
        if (comp == true) {
            if (entered1 == true) {
                const player1 = player(player1Name, "X"); 
                playGame.playSing(player1);
            } else if (entered1 == false) {
                const player1 = player("Anonymous", "X");
                playGame.playSing(player1);
            }
        } else if (comp == false) {
            if ((entered1 == true) && (entered2 == true)) {
                playGame.playMult()
            } else {
                const output = document.querySelector("#outputString");
                output.textContent = "Please enter your names and play again...";
            }
        }
    })

    const numberButtonsEvents = (playerForSym, isItSet) => {
        if (isItSet == false) {
            const numberButt = Array.from(document.querySelectorAll(".clickAble"));
            for (let i = 0; i < gameBoard.length; i++) {
                numberButt[i].addEventListener('click', playGame.numberButtons(numberButt[i], i, playerForSym.symbol));
            }
        } else if (isItSet == true) {
            const numberButt = Array.from(document.querySelectorAll(".clickAble"));

            for (let iNum1 = 0; iNum1 < gameBoard.length; iNum1++) {
                numberButt[iNum1].removeEventListener('click', playGame.numberButtons(numberButt[iNum1], iNum1, playerForSym.symbol));
            }

            for (let iNum2 = 0; iNum2 < gameBoard.length; iNum2++) {
                numberButt[iNum2].addEventListener('click', playGame.numberButtons(numberButt[iNum2], iNum2, playerForSym.symbol));
            }

        } else {
            console.log(isItSet);
        }
        const numberButt = Array.from(document.querySelectorAll(".clickAble"));

        numberButt[i].addEventListener('click', playGame.numberButtons(numberButt[i], i, playerForSym.symbol));
    }

    // -----------------------------------------------------
    // Additional functions:

    function remOrAdd(computerOrNot) {
        const mainDiv = document.querySelector("#settings");
    
        if (computerOrNot == true) {
            const toggle = document.querySelector("#opponentToggle");
            
            const input2 = document.querySelector("#input2");
            const button2 = document.querySelector("#button2");
            const breakPlay21 = document.querySelector("#breakPlay21");
            const breakPlay22 = document.querySelector("#breakPlay22");

            removeEventPlayer2();

            mainDiv.removeChild(input2);
            mainDiv.removeChild(button2);
            mainDiv.removeChild(breakPlay21);
            mainDiv.removeChild(breakPlay22);

            toggle.textContent = "Against player 2";

        } else if (computerOrNot == false) {
            const toggle = document.querySelector("#opponentToggle");

            const play = document.querySelector("#play");
            
            const input2 = document.createElement("input");
            input2.setAttribute("id", "input2");
            input2.setAttribute("type", "text");
            input2.setAttribute("placeholder", "Player 2 name:")
            input2.setAttribute("required", "");
            const button2 = document.createElement("button");
            button2.setAttribute("id", "button2");
            button2.setAttribute("type", "submit");
            button2.textContent = "submit";
            button2.style.cssText = "margin: 0px 0px 0px 4px";
            const breakPlay21 = document.createElement("br");
            breakPlay21.setAttribute("id", "breakPlay21");
            const breakPlay22= document.createElement("br");
            breakPlay22.setAttribute("id", "breakPlay22");

            mainDiv.insertBefore(input2, play);
            mainDiv.insertBefore(button2, play);
            mainDiv.insertBefore(breakPlay21, play);
            mainDiv.insertBefore(breakPlay22, play);

            setEventPlayer2();

            toggle.textContent = "Against computer";
    
        } else {
            console.log(computerOrNot);
        }
    }

    function setEventPlayer2() {
        const getPlayerName2 = document.querySelector("#button2");
        getPlayerName2.addEventListener('click', eventFunction);
    }

    function removeEventPlayer2() {
        const getPlayerName2 = document.querySelector("#button2");
        getPlayerName2.removeEventListener('click', eventFunction);
    }

    function eventFunction() {
        const inputText2 = document.querySelector("#input2");
        player2Name = inputText2.value;
        inputText2.setAttribute("placeholder", player2Name);
        inputText2.value = "";

        entered2 = true;
    }

    return { gameboard, turnPlay1, numberButtonsEvents };

})();

let playGame = (function () {
    'use strict';
    

    const playSing = (playerOne) => {
        let game = true;
        while (game) {
            for (let i = 0; i < gameBoard.length; i++) {
                if (!(gameBoard[i] == "") && (i == (gameBoard.length - 1))) {
                    const itsDraw = document.querySelector("#outputString");
                    itsDraw.textContent = "It is a draw!";
                    game = false
                }
            }
            
            if (setUpGame.turnPlay1 == true) {
                setUpGame.numberButtonsEvents(playerOne, setButtons);
                checkIfWon(playerOne);
                setUpGame.turnPlay1 = !setUpGame.turnPlay1;
            } else if (setUpGame.turnPlay1 == false) {
                // computer turn, check if won, and turn true again.
            } else {
                console.log(setUpGame.turnPlay1);
            }

            if (setUpGame.setButtons == false) {
                setUpGame.setButtons = true;
            }
        }
    }

    const playMult = (playerOne, playerTwo) => {
        // take turns
    }

    const numberButtons = (numberButton, iRef, symbol) => {
        numberButton.textContent = symbol;
        gameboard[iRef] = symbol;
    }

    const computerTurn = () => {
        
    }

    const checkIfWon = (playerCurr) => {
        const outputString = document.querySelector("#outputString");

        if ((gameBoard[0] == playerCurr.symbol) && (gameBoard[1] == playerCurr.symbol) && (gameBoard[2] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;    
        } else if ((gameBoard[3] == playerCurr.symbol) && (gameBoard[4] == playerCurr.symbol) && (gameBoard[5] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        } else if ((gameBoard[6] == playerCurr.symbol) && (gameBoard[7] == playerCurr.symbol) && (gameBoard[8] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        } else if ((gameBoard[0] == playerCurr.symbol) && (gameBoard[3] == playerCurr.symbol) && (gameBoard[6] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        } else if ((gameBoard[1] == playerCurr.symbol) && (gameBoard[4] == playerCurr.symbol) && (gameBoard[7] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        } else if ((gameBoard[2] == playerCurr.symbol) && (gameBoard[5] == playerCurr.symbol) && (gameBoard[8] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        } else if ((gameBoard[0] == playerCurr.symbol) && (gameBoard[4] == playerCurr.symbol) && (gameBoard[8] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        } else if ((gameBoard[2] == playerCurr.symbol) && (gameBoard[4] == playerCurr.symbol) && (gameBoard[6] == playerCurr.symbol)) {
            outputString.textContent = `${playerCurr.name}, you have won!`;  
        }
    }
})();

function player(name, symbol) {
    // factory function
    return { name, symbol };
}