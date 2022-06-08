interface Numbers {
  x: number;
  y: number;
}

interface Operation {
  "+": (a: number, b: number) => number;
  "-": (a: number, b: number) => number;
  "*": (a: number, b: number) => number;
  "/": (a: number, b: number) => number;
  [key: string]: (a: number, b: number) => number;
}

const operations: Operation = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

var firstNumber: Numbers["x"];
var secondNumber: Numbers["y"];
var operatorSelected: true | false;
var operator = "";
var resultElement = document.getElementById("result") as HTMLElement | any;

const display = (result: string): void => {
  if (
    resultElement.textContent !== "" &&
    resultElement.textContent !== "0" &&
    !operatorSelected
  ) {
    resultElement.textContent += result;
  } else {
    resultElement.textContent = result;
  }
};

const performOperation = (
  fnum: number,
  snum: number,
  operation: string,
  callback: any
) => {
  let sum = 0;

  for (let oper in operations) {
    if (operation === oper) {
      sum += operations[oper](fnum, snum);
      callback(sum);
      break;
    }
  }
};

const buttonEvent = (el: any) => {
  let operatorFromInput = el.target.getAttribute("data-el");

  if (
    !(operatorFromInput in operations) &&
    operatorFromInput !== "=" &&
    operatorFromInput !== "AC"
  ) {
    display(el.target.getAttribute("data-el"));
  } else if (operatorFromInput in operations) {
    operator = operatorFromInput;
    firstNumber = parseFloat(resultElement.textContent);
    resultElement.textContent = 0;
  } else if (operatorFromInput === "AC") {
    resultElement.textContent = 0;
    firstNumber = 0;
    secondNumber = 0;
  } else {
    secondNumber = parseFloat(resultElement.textContent);
    resultElement.textContent = 0;
    performOperation(firstNumber, secondNumber, operator, display);
  }
};

const main = () => {
  let button = document.querySelectorAll(".button")!;
  button.forEach((event) => {
    event.addEventListener("click", (el) => buttonEvent(el));
  });
};
main();
