"use strict";
const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};
var firstNumber;
var secondNumber;
var operatorSelected;
var operator = "";
var resultElement = document.getElementById("result");
const display = (result) => {
    if (resultElement.textContent !== "" &&
        resultElement.textContent !== "0" &&
        !operatorSelected) {
        resultElement.textContent += result;
    }
    else {
        resultElement.textContent = result;
    }
};
const performOperation = (fnum, snum, operation, callback) => {
    let sum = 0;
    for (let oper in operations) {
        if (operation === oper) {
            sum += operations[oper](fnum, snum);
            callback(sum);
            break;
        }
    }
};
const buttonEvent = (el) => {
    let operatorFromInput = el.target.getAttribute("data-el");
    if (!(operatorFromInput in operations) &&
        operatorFromInput !== "=" &&
        operatorFromInput !== "AC") {
        display(el.target.getAttribute("data-el"));
    }
    else if (operatorFromInput in operations) {
        operator = operatorFromInput;
        firstNumber = parseFloat(resultElement.textContent);
        resultElement.textContent = 0;
    }
    else if (operatorFromInput === "AC") {
        resultElement.textContent = 0;
        firstNumber = 0;
        secondNumber = 0;
    }
    else {
        secondNumber = parseFloat(resultElement.textContent);
        resultElement.textContent = 0;
        performOperation(firstNumber, secondNumber, operator, display);
    }
};
const main = () => {
    let button = document.querySelectorAll(".button");
    button.forEach((event) => {
        event.addEventListener("click", (el) => buttonEvent(el));
    });
};
main();
