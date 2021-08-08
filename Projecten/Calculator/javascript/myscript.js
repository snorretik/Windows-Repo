// Beginning variables, not that much.
let strTotal = "";
let strResult = "";
let previousChar = "";
let decimalUsed = false;

// This code adds a number to a string. A simple way to enter bigger than one digit numbers.
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        strTotal += `${button.textContent}`;
        previousChar = `${button.textContent}`;
        showTotal(strTotal);
    })
})

// This code handles the operator buttons. If already an operator was pressed it doesn't do anything anymore. If not a new number is going to be entered so decimalUsed is reset. Then the operator is added to strTotal.
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (previousChar === "" || previousChar === "+" || previousChar === "-" || previousChar === "*" || previousChar === "/" || previousChar === ".") {
            strTotal += "";            // add nothing
            showTotal(strTotal);       // <-- this line isn't really needed, added anyway
        } else {
            decimalUsed = false;
            strTotal += `${button.textContent}`;
            previousChar = `${button.textContent}`;
            showTotal(strTotal)
        }
    })
})

// This is the equals button. This button fires the whole calculation in my code. I didn't use seperate functions for that. I just added it(in the right order) after eachother.
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', (e) => {
    let strTotArr = strTotal.split("");
    strTotal = "";
    strResult = "";
    let strCalcArr = [];
    let number = "";
    let divideZero = false;
    let endedOperator = false;
    decimalUsed = false;

    // It checks if last char was an operator. It checks for that later on. I notice that I'm already resetting variables for a next run. Which is probably what I thought about for the else part. Don't really know why I am already handling that. Or why I thought of this part first.
    if (previousChar === "+" || previousChar === "-" || previousChar === "*" || previousChar === "/" || previousChar === ".") {
        endedOperator = true;
    } else {
        previousChar = "";
    }

    // This code analyses the input string. It seperates numbers from operators. And it looks if it's at the end of the string to push that number as well (middle).
    for (let i = 0; i < strTotArr.length; ++i) {
        if (strTotArr[i] === "+" || strTotArr[i] === "-" || strTotArr[i] === "*" || strTotArr[i] === "/") {
            strCalcArr.push(`${number}`);
            number = "";
            strCalcArr.push(strTotArr[i]);
        } else if ((i + 1) === strTotArr.length) {
            number += strTotArr[i];                       // middle part
            strCalcArr.push(`${number}`);
        } else {
            number += strTotArr[i];
        }
    }

    // This code runs before addition and subtraction. It goes first. So it checks if either one of * or / is found. If so it stores that position at the start. 
    while (strCalcArr.indexOf("*") !== -1 || strCalcArr.indexOf("/") !== -1) {
        let x = strCalcArr.indexOf("*");
        let y = strCalcArr.indexOf("/");

        // If it has found a * and a /, it figures out what goes first. And takes the number before the operator and the number after the operator, and calculates it. It stores the variable in the "left"-most-variable and removes the 2 "right"-most places. It eventually does that untill the result is in strCalcArr[0], the left-most one.
        if (x !== -1 && y !== -1) {
            if (x < y) {                    // * goes first
                strCalcArr[x - 1] = Math.round(+strCalcArr[x - 1] * +strCalcArr[x + 1] * 100) / 100;
                strCalcArr.splice(x, 2);
            } else if (y < x) {
                if (+strCalcArr[y + 1] === 0) {        // / goes first, so it checks if the next number is a zero.
                    divideZero = true;
                    strCalcArr.splice(y, 2);
                } else {                              // / this is the main division
                    strCalcArr[y - 1] = Math.round(+strCalcArr[y - 1] / +strCalcArr[y + 1] * 100) / 100;
                    strCalcArr.splice(y, 2);
                }
            }   // no else cause it's either x < y or x > y, not x === y or something like that
        } else if (x !== -1 && y === -1) {    // if only a * it does that one
            strCalcArr[x - 1] = Math.round(+strCalcArr[x - 1] * +strCalcArr[x + 1] * 100) / 100;
            strCalcArr.splice(x, 2);
        } else if (x === -1 && y !== -1) {     // if only a / it checks for zero again
            if (+strCalcArr[y + 1] === 0) {
                divideZero = true;
                strCalcArr.splice(y, 2);
            } else {                           // here it does the main / calculation
                strCalcArr[y - 1] = Math.round(+strCalcArr[y - 1] / +strCalcArr[y + 1] * 100) / 100;
                strCalcArr.splice(y, 2);
            }
        }
    }

    // Then next up is + and -, so it checks if it finds it. Stores those locations, or stores a -1 when not found.
    while (strCalcArr.indexOf("+") !== -1 || strCalcArr.indexOf("-") !== -1) {
        let x = strCalcArr.indexOf("+");
        let y = strCalcArr.indexOf("-");
        if (x !== -1 && y !== -1) {   // if both a + and a -
            if (x < y) {                    // if + is first, then it does +
                strCalcArr[x - 1] = +strCalcArr[x - 1] + +strCalcArr[x + 1];
                strCalcArr.splice(x, 2);
            } else if (y < x) {             // otherwise it does -
                strCalcArr[y - 1] = +strCalcArr[y - 1] - +strCalcArr[y + 1];
                strCalcArr.splice(y, 2);
            }
        } else if (x !== -1 && y === -1) {   // if only a + it does that
            strCalcArr[x - 1] = +strCalcArr[x - 1] + +strCalcArr[x + 1];
            strCalcArr.splice(x, 2);
        } else if (x === -1 && y !== -1) {   // if only a - it does that one
            strCalcArr[y - 1] = +strCalcArr[y - 1] - +strCalcArr[y + 1];
            strCalcArr.splice(y, 2);
        }
    }

    // By now it should have reduced the string to length 1, so only strCalcArr[0], so it checks for that plus that it hasn't encountered any error conditions. Then it prints the result accordingly.
    if (strCalcArr.length === 1 && divideZero === false && endedOperator === false) {
        strResult = strCalcArr[0];          
        showResult(strResult);              // if a number is present in [0]
    } else if (divideZero === true) {             
        strResult = "Error: divided by zero!";
        showResult(strResult);              // if divided by zero
    } else if (endedOperator === true) {
        strResult = "Error: ended on operator!";
        showResult(strResult);              // if ended on operator
    } else {
        console.log(strCalcArr[0])          // else I want to know what's going on, so I log it. But it shouldn't happen.
        console.log(strCalcArr.length)
    }
})

// Relatively simple implementation of the decimal button. Checks if it was already used and throughout the program it keeps track if it should be reset or not.
const decimalButton = document.querySelector("#decimal")
decimalButton.addEventListener('click', (e) => {
    if (decimalUsed === true) {
        strTotal += "";
        showTotal(strTotal)
    } else if (decimalUsed === false) {
        strTotal += ".";
        decimalUsed = true;
        previousChar = ".";
        showTotal(strTotal);
    }
})

// Clear is probably the simplest one.
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener('click', (e) => {
    strTotal = "";
    showTotal(strTotal);
    strResult = "";
    showResult(strResult);
    previousChar = "";
})

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener('click', (e) => {
    // Hij moet ook nog decimalUsed aanpassen als ie weer terug gaat naar een eerder cijfer. Nu kun je als je 1 puntje hebt gebruikt verder en dan weer backspace en zo kan je een cijfer maken met meer dan 1 punt ertussen.
    // Oke ik heb 'm nou heel simpel aangepast zonder precies meer te weten hoe het werkt. Het lijkt nu goed te gaan en het was dus veel simpeler dan dat ik in eerste instantie dacht. Maar er zijn eigenlijk wel heel veel combinaties mogelijk. Dus ja dan zou je echt moeten gaan testen. Maar ik heb ze er wel makkelijk uit gehaald. Zo is de volgende lijn die ik gecomment heb iéts anders aangepast... nou goed... ik vind het moeilijk uit te leggen maar... dat was bijna hetzelfde. Maar toch anders. Haha. Hij haalde er 1 weg sowieso. En checkte dan of de volgende een punt was. Maar als je alleen een punt had met nog geen nummer erachter, dan moet ie 'm ook weghalen EN decimalUsed op false zetten. Dat was iets anders. Dat is de laatste aanpassing.
    
    // strTotal = strTotal.slice(0, (strTotal.length - 1))

    if (strTotal[(strTotal.length - 2)] == ".") {
        strTotal = strTotal.slice(0, (strTotal.length - 2))
        decimalUsed = false;
    } else if (strTotal[(strTotal.length - 1)] == "."){
        strTotal = strTotal.slice(0, (strTotal.length - 1))
        decimalUsed = false;
    } else {
        strTotal = strTotal.slice(0, (strTotal.length - 1))
    }

    if (strTotal.length == 1 || strTotal.length == 0) {
        previousChar = "";
    } else {
        previousChar = strTotal[(strTotal.length - 1)];
    }
    
    // recursBack();

    showTotal(strTotal);            
})

// The 2 show functions. First one.
function showTotal(strTotal) {
    const aElement = document.querySelector("#stringCalculation")
    aElement.textContent = strTotal;
}

// Second show function.
function showResult(strResult) {
    const aResult = document.querySelector("#stringResult")
    aResult.textContent = strResult;
}

// I thought for a second that I had to call a function again in itsself if there were 2 decimal points after eachother. But I'm already checking that when entering, so it shouldn't happen. But it was a funny realization that that was probably what recursion is about. It felt like it anyway, a function calling itsself until an exit condition is found. In any case very similar to recursion, but maybe not "true" recursion.

// function recursBack() {
//     strTotal = strTotal.slice(0, (strTotal.length - 1))
//     if (strTotal[(strTotal.length - 1)] == ".") {
//         strTotal = strTotal.slice(0, (strTotal.length - 1))
//     } else {
//         previousChar = strTotal[(strTotal.length - 1)];
//     }
// }