(function() {
    // main game

    // there is no communication anymore with other Modules so I don't have to export,
    // and the private and public underscores don't matter anymore, but ideally they
    // should be updated
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _play = false;
    let _comp = false;
    let _player1Name = "";
    let _player2Name = "";
    
    let player1 = {};
    let player2 = {};
    let play1Turn = true;

    let squaresAI = [];
    let squaresPlay = [];

    function setButtons() {
        // set the playing buttons, all at once through the array

        const clickMoves = Array.from(document.querySelectorAll(".vakjes"));
        for (let i = 0; i < clickMoves.length; i++) {
            // this is where the gameplay channels through
            // there is no game loop (while), instead it's filtered click by click
            // that's why the main gameplay is found here
            clickMoves[i].addEventListener('click', (e) => {
                firstMove();

                if ((_comp == true) && (_play == true)) {
                    // singleplayer game
                    if ((play1Turn == true) && (clickMoves[i].textContent == "")) {
                        // this is making the move, if available
                        const buttonHTML = document.querySelector(`#number${i + 1}`);
                        buttonHTML.textContent = player1.sign;
                        gameBoard[i] = player1.sign;
                        
                        squaresPlay.push(i);

                        if (checkIfWon(player1.sign)) {
                            player1.wonMessage();
                            startRestart();
                        } else if (!checkIfWon(player1.sign)) {
                            play1Turn = false;
                            
                            // right now if it's a draw it's registered by the AI move, nowhere else
                            playCompTurn();
                            if (checkIfWon("O")) {
                                compWonMessage();
                                startRestart();
                            }
                        } else {
                            // just in case some extra info, but it shouldn't get here
                            console.log(checkIfWon(player1.sign));
                        }
                    }
        
                } else if ((_comp == false) && (_play == true)) {
                    // multiplayer game
                    const buttonHTML = document.querySelector(`#number${i + 1}`);

                    if ((play1Turn == true) && (clickMoves[i].textContent == "")){
                        // player 1
                        // I coded this seperately for both players, but I repeated a lot of this for
                        // player 2 as well. And if you repeat, you should code it instead... is the
                        // thought at least... so I could improve here but haven't done it yet.
                        if (gameBoard.indexOf("") != -1) {
                            // making the move again, if available
                            buttonHTML.textContent = player1.sign;
                            gameBoard[i] = player1.sign;
                            if (checkIfWon(player1.sign)) {
                                player1.wonMessage();
                                startRestart();
                            }
                            play1Turn = false;

                        } else if (gameBoard.indexOf("") == -1) {
                            // if there's no move left
                            alert("It's a draw!")
                            startRestart();
                        } else {
                            console.log(gameBoard.indexOf(""));
                        }

                    } else if ((play1Turn == false) && (clickMoves[i].textContent == "")) {
                        // player 2
                        if (gameBoard.indexOf("") != -1) {
                            // making the move if available
                            buttonHTML.textContent = player2.sign;
                            gameBoard[i] = player2.sign;
                            if (checkIfWon(player2.sign)) {
                                player2.wonMessage();
                                startRestart();
                            }
                            play1Turn = true;

                        } else if (gameBoard.indexOf("") == -1) {
                            // if there's no move left
                            alert("It's a draw!");
                            startRestart();
                        } else {
                            // in case something unexpected happens, log it
                            console.log(gameBoard.indexOf(""));
                        }
                    }
                } else if (_play == false) {
                    // niks...?

                    // so here nothing is needed, and I had some logs here but they're also no longer
                    // needed
                }
            });
        }
    }

    // this function runs when a move is played but the names haven't been handled yet.
    // it fires, so the players are made and game is set to playing.
    // you can play single player anonymously but if one name is entered and the other field is open
    // still, it requires completing the other player as well so nobody can play anonymously in a 2
    // player game
    function firstMove() {
        // if play hasn't started yet it needs to handle the names
        if (_play == false) {

            if ((_player1Name != "") && (_player2Name != "")) {
                // if both names have been entered already everything is fine
                player1 = player(_player1Name, "X");
                player2 = player(_player2Name, "O");
                
                _play = true;
                
            } else if ((_player1Name != "") && (_comp == true)) {
                // single player and name entered
                player1 = player(_player1Name, "X");

                _play = true;
                
            } else if ((_player1Name == "") && (_comp == true)) {
                // single player and name not entered
                _player1Name = "Anonymous";
                player1 = player(_player1Name, "X");
                
                _play = true;

            } else if ((((_player1Name != "") && (_player2Name == "")) && (_comp == "false")) || (((_player1Name == "") && (_player2Name != "")) && (_comp == "false"))) {
                // this is a little complicated but as I said above, if one name field is entered and
                // the other is still blank, it doesn't do anything yet, until you entered the 2nd one
                _play = false;
            } else {
                // console.log("test123");
                // kan zijn dat dit leeg moet zijn

                // the game regularly passes through this part without having to do anything
                // it was helpful logging this to know what ran when
            }
        } else {
            // console.log(_play);
            // kan zijn dat dit leeg moet zijn

            // the game regularly passes through this part without having to do anything
            // it was helpful logging this to know what ran when
        }
    }

    // this was created when comp was still a seperate module, but I still use it, no longer necessary
    function switchTurn() {
        play1Turn = !play1Turn;
    }

    // checks if won, like the name says
    function checkIfWon(sign) {
        if ((gameBoard[0] == sign) && (gameBoard[1] == sign) && (gameBoard[2] == sign)) {
            return true;    
        } else if ((gameBoard[3] == sign) && (gameBoard[4] == sign) && (gameBoard[5] == sign)) {
            return true;
        } else if ((gameBoard[6] == sign) && (gameBoard[7] == sign) && (gameBoard[8] == sign)) {
            return true;
        } else if ((gameBoard[0] == sign) && (gameBoard[3] == sign) && (gameBoard[6] == sign)) {
            return true;
        } else if ((gameBoard[1] == sign) && (gameBoard[4] == sign) && (gameBoard[7] == sign)) {
            return true;
        } else if ((gameBoard[2] == sign) && (gameBoard[5] == sign) && (gameBoard[8] == sign)) {
            return true;
        } else if ((gameBoard[0] == sign) && (gameBoard[4] == sign) && (gameBoard[8] == sign)) {
            return true;
        } else if ((gameBoard[2] == sign) && (gameBoard[4] == sign) && (gameBoard[6] == sign)) {
            return true;
        }
    }

    // this resets everything. Not confident about this part yet but it seems to do what it's supposed
    // to do correctly so far
    function startRestart() {
        _play = false;

        // needs to bring back the 2nd field, only when gone... otherwise it duplicates stuff
        // so it checks for that
        if (_comp == true) {
            _comp = false;
            remOrAdd(_comp);
        }

        // changes the displayed moves back to empty
        const klikMoves = document.querySelectorAll(".vakjes");
        klikMoves.forEach((button) => {
            button.textContent = "";
        })

        gameBoard = ["", "", "", "", "", "", "", "", ""];

        _player1Name = "";
        _player2Name = "";

        const input1 = document.querySelector("#input1");
        const input2 = document.querySelector("#input2");

        input1.setAttribute("placeholder", "Player 1 name:");
        input2.setAttribute("placeholder", "Player 2 name:");

        // was afraid this was too simple, but it seems to hold
        player1 = {};
        player2 = {};
        play1Turn = true;

        squaresAI = [];
        squaresPlay = [];
    }

    function setSubmitButtons() {
        // this sets the other buttons, so not the play ones but the comp toggle, the restart, and the
        // submit buttons
        const button1 = document.querySelector("#button1");
        const button2 = document.querySelector("#button2");
        const compToggle = document.querySelector("#opponentToggle");
        const reset = document.querySelector("#startRestart");

        reset.addEventListener('click', startRestart);

        button1.addEventListener('click', (e) => {
            const input1 = document.querySelector("#input1");
            // shouldn't do anything when empty so it checks for that, also repeats
            // a bit further ahead for input2 as well ... so... not ideal
            if (input1.value != "") {
                _player1Name = input1.value;
                input1.setAttribute("placeholder", _player1Name);
                input1.value = "";
            }
        })
        
        // because of how it starts, this has been set here once, and after that it is done in remOrAdd
        button2.addEventListener('click', eventButton2);

        // opponent toggle
        compToggle.addEventListener('click', (e) => {
            // only removes the second field if it wasn't entered yet, checks for name instead of
            // object because object has stuff about reference I'm not confident with yet
            if ((_comp == false) && (_player2Name == "")) {
                _comp = !_comp;
                remOrAdd(_comp);
            } else if (_comp == true) {
                _comp = !_comp;
                remOrAdd(_comp);
            } else {
                // again, if possible... I enter logs here as well just in case something goes wrong
                console.log(_comp);
            }
        })
    }

    // maybe something questionable, but I made this a seperate function instead of arrow function so I
    // can specify which function needs to be removed when removeEventListener is run
    function eventButton2() {
        const input2 = document.querySelector("#input2");
        // shouldn't do anything when empty so it checks for that
        if (input2.value != "") {
            _player2Name = input2.value;
            input2.setAttribute("placeholder", _player2Name);
            input2.value = "";
        }
    }

    // this does a lot, and it is for selecting and removing or adding the 2nd player field and buttons
    // also needs breaks with ID's so it's a lot of work... and perhaps this could be A LOT simpler by
    // making it invisible in some way instead
    function remOrAdd(computerOrNot) {
        const mainDiv = document.querySelector("#settings");
    
        if (computerOrNot == true) {
            // if computer as opponent, remove
            const toggle = document.querySelector("#opponentToggle");
            
            const input2 = document.querySelector("#input2");
            const button2 = document.querySelector("#button2");
            const breakPlay21 = document.querySelector("#breakPlay2numb1");
            const breakPlay22 = document.querySelector("#breakPlay2numb2");

            button2.removeEventListener('click', eventButton2);

            mainDiv.removeChild(input2);
            mainDiv.removeChild(button2);
            mainDiv.removeChild(breakPlay21);
            mainDiv.removeChild(breakPlay22);

            // it doesn't show the current state, but the one it changes to... so this is why this says
            // against player 2
            toggle.textContent = "Against player 2";

        } else if (computerOrNot == false) {
            // if player 2 as opponent, add it
            const toggle = document.querySelector("#opponentToggle");
            
            const outputString = document.querySelector("#outputString");

            const input2 = document.createElement("input");
            input2.setAttribute("id", "input2");
            input2.setAttribute("type", "text");
            input2.setAttribute("placeholder", "Player 2 name:")
            //input2.setAttribute("required", "");
            const button2 = document.createElement("button");
            button2.setAttribute("id", "button2");
            button2.setAttribute("type", "submit");
            button2.textContent = "submit";
            // have to do this margin stuff because initially it has a space between the text field and
            // the submit button but if removing it and adding it again it's gone. So this way it sort
            // of still looks the same ---\/
            button2.style.cssText = "margin: 0px 0px 0px 4px";
            const breakPlay21 = document.createElement("br");
            breakPlay21.setAttribute("id", "breakPlay2numb1");
            const breakPlay22= document.createElement("br");
            breakPlay22.setAttribute("id", "breakPlay2numb2");

            // add before outputString (Only says Make a move: at the moment)
            mainDiv.insertBefore(input2, outputString);
            mainDiv.insertBefore(button2, outputString);
            mainDiv.insertBefore(breakPlay21, outputString);
            mainDiv.insertBefore(breakPlay22, outputString);

            button2.addEventListener('click', eventButton2);

            // it doesn't show the current state, but the one it changes to... so this is why this says
            // against computer
            toggle.textContent = "Against computer";
    
        } else {
            console.log(computerOrNot);
        }
    }

    // ----------------------------------------------------------------------------------------------
    // this is a bit stupid, this is for the computer. And it essentially keeps picking a random number
    // until it has found a valid move. So it can potentially take a long time before it finds a 
    // possible move randomly especially till the end of the game, when it has to randomly find the
    // only move left in the game, this is done with a while loop
    // ---
    // the alternative I had in mind was converting the given array into an object and then an array
    // again, but possibly it could have been with removing instead of splice as well, but then there
    // would have been "gaps" in the array, but that's the only way the possible options were still
    // available
    // ---
    // this was a seperate module, but then it wouldn't have been able to get the reset gameBoard 
    // anymore cause the return wasn't updating it in this module. So the modules couldn't communicate
    // properly
    function playCompTurn () {
        let _makeChoice = true;

        // let number = (Math.floor((Math.random() * 10) + 1) - 1);
        // let number = Math.floor(Math.random() * 10);
        let number = 0;

        // console.log(game);
        // console.log(game.player1);

        // ------------- AI ----------------
        while (_makeChoice) {
            if (squaresPlay.length == 1) {
                // if player has only made 1 move
                if (gameBoard[4] != "") {
                    // if center is taken, move in a corner
                    const arrayHoek = Array.from(document.querySelectorAll(".hoek"));
                    number = Math.floor(Math.random() * 4);
                    arrayHoek[number].textContent = "O";
                    const tempVar = arrayHoek[number].value;
                    gameBoard[tempVar] = "O";
    
                    squaresAI.push(number);
                    _makeChoice = false;
                    switchTurn();
                } else {
                    // else take center, simple
                    const middenVak = document.querySelector(".midden")
                    middenVak.textContent = "O";
                    gameBoard[4] = "O";

                    squaresAI.push(4);
                    _makeChoice = false;
                    switchTurn();
                }
            } else if (squaresPlay.length == 2) {
                // if player has made 2 moves, there is potentially a winning move...
                if ((checkAhead("X") == -1) && (checkAhead("O") == -1)) {
                    // if there is no winning move, for either player or AI, then do following...
                    if (gameBoard[4] == "O") {
                        // if center is AI, move on a side square
                        const arrayZijkant = Array.from(document.querySelectorAll(".zijkant"));
                        number = Math.floor(Math.random() * 4);
                        const tempVar = arrayZijkant[number].value;

                        if (gameBoard[tempVar] == "") {
                            // if available, take one of side squares
                            arrayZijkant[number].textContent = "O";
                            // const tempVar = arrayZijkant[number].value;
                            gameBoard[tempVar] = "O";
    
                            squaresAI.push(number);
                            _makeChoice = false
                            switchTurn()
                        } else if (gameBoard[tempVar] != "") {
                            // if not available, different number... need to check where this goes...
                            // maybe I have to do a continue in these places
                            number = Math.floor(Math.random() * 4);
                            continue;
                        } else {
                            console.log(gameBoard[number]);
                        }
                    } else if (gameBoard[4] == "") {
                        // if center still available, take it... this one shouldn't be needed
                        const midden = document.querySelector(".midden");
                        midden.textContent = "O";
                        gameBoard[4] = "O";

                        squaresAI.push(4);
                        _makeChoice = false;
                        switchTurn();

                    } else if ((gameBoard[4] == "X") && (checkAhead("X") != -1)) {
                        // if center is Player, there is a winning move unless he blocked himself so...
                        // this isn't possible either cause of the checkAhead earlier
                        number = checkAhead("X");
                        // if winning move for player, take that one
                        const impSquare = document.querySelector(`#number${number + 1}`);
                        impSquare.textContent = "O";
                        gameBoard[number] = "O";

                        squaresAI.push(number);
                        _makeChoice = false;
                        switchTurn();
                    // } else if (!checkAhead("X")) {
                    } else if (checkAhead("X") == -1) {
                        // if no winning move for player, choose random move entire board... 
                        number = Math.floor((Math.random() * 10));
                        if (gameBoard[number] == "") {
                            const randSquare = document.querySelector(`#number${number + 1}`);
                            randSquare.textContent = "O";
                            gameBoard[number] = "O";

                            squaresAI.push(number);
                            _makeChoice = false;
                            switchTurn();
                        } else if (gameBoard[number] != "") {
//                            // take new number again if not available
                            number = Math.floor((Math.random() * 10));
                            continue;
                        }
                    } else {
                        console.log("442");
                    }
                } else if ((checkAhead("X") != -1) || (checkAhead("O") != -1)) {
                    // if there is a winning move for either player enter this part
                    if (checkAhead("O") != -1) {
                        // if winning move for AI, make that... has to be first because has priority...
                        // check for availability 
                        
                        number = checkAhead("O");
                        const winSquare = document.querySelector(`#number${number + 1}`);
                        winSquare.textContent = "O";
                        gameBoard[number] = "O";

                        squaresAI.push(number);
                        _makeChoice = false;
                        switchTurn();
                    } else if (checkAhead("X") != -1) {
                        // if winning move for player, block
                        number = checkAhead("X");
                        const loseSquare = document.querySelector(`#number${number + 1}`);
                        loseSquare.textContent = "O";
                        gameBoard[number] = "O";

                        squaresAI.push(number);
                        _makeChoice = false;
                        switchTurn();
                    } else {
                        // test, logs where it goes wrong
                        console.log("464");
                    }
                }

            } else if ((squaresPlay.length > 2) && (squaresPlay.length < 5)) {
                // this was a guess... to repeat it one more time.
                if (checkAhead("O") != -1) {
                    // if winning move for AI take this one (first)
                    number = checkAhead("O");
                    const winSquare = document.querySelector(`#number${number + 1}`);
                    winSquare.textContent = "O";
                    gameBoard[number] = "O";

                    squaresAI.push(number);
                    _makeChoice = false;
                    switchTurn();
                } else if (checkAhead("X") != -1) {
                    // if winning move for player, block again
                    number = checkAhead("X");
                    const loseSquare = document.querySelector(`#number${number + 1}`);
                    loseSquare.textContent = "O";
                    gameBoard[number] = "O";

                    squaresAI.push(number);
                    _makeChoice = false;
                    switchTurn();
                } else {
                    // make random move. So this is not a optimal strategy, it still has randomness...
                    number = Math.floor((Math.random() * 10));
                    if (gameBoard[number] == "") {
                        console.log(number);
                        console.log(checkAhead("O"));
                        console.log(checkAhead("X"));
                        const randSquare = document.querySelector(`#number${number + 1}`);
                        randSquare.textContent = "O";
                        gameBoard[number] = "O";

                        squaresAI.push(number);
                        _makeChoice = false;
                        switchTurn();
                    } else if (gameBoard[number] != "") {
                        number = Math.floor((Math.random() * 10));
                        continue;
                    }
                }
            } else if (squaresPlay.length >= 5) {
                alert("It is a draw!");
                startRestart();
                _makeChoice = false;
            }
        }

        function checkAhead(stringOpp) {
            for (let i = 0; i < gameBoard.length; i++) {
                if (gameBoard[i] == "") {
                    gameBoard[i] = stringOpp;
                    if (checkIfWon(stringOpp)) {
                        gameBoard[i] = "";
                        return i;
                    } else if ((!checkIfWon(stringOpp) && (i == (gameBoard.length - 1)))) {
                        gameBoard[i] = "";
                        return -1;
                    } else {
                        gameBoard[i] = "";
                        continue;
                    }
                } else if (i == (gameBoard.length -1)) {
                    return -1;
                } else {
                    // even niks doen
                }
            }
        }
        

        // ----------- random --------------
        // while (makeChoice) {
        //     // first check if there's a move at all available
        //     if (gameBoard.indexOf("") == -1) {
        //         alert("It is a draw!");
        //         startRestart();
        //         makeChoice = false;
        //     } else {
        //         if (gameBoard[number] == "") {
        //             // then if a move is available, make it
        //             const buttonHTML = document.querySelector(`#number${number + 1}`);
        //             buttonHTML.textContent = "O";
        //             gameBoard[number] = "O";
    
        //             switchTurn();
        //             makeChoice = false;
        //         } else if (gameBoard[number] != "") {
        //             // otherwise keep guessing random moves until it's available, a little stupid...
        //             // number = (Math.floor((Math.random() * 10) + 1) - 1);
        //             number = (Math.floor(Math.random() * 10);
        //         }
        //     }
        // }
    }

    // this was a method
    function compWonMessage() {
        alert("Computer has won!");
    }

    // this is what is needed to play the game the first time around
    setSubmitButtons();
    setButtons();
})();

// doesn't do much at all... but it's there...
function player(name, sign) {
    // maybe do some more...
    // misschien variabelen nog opslaan.
    function wonMessage() {
        alert(`${name}, you have won!`);
    } 
    return { 
        name: name, 
        sign: sign, 
        wonMessage: wonMessage
    }
}