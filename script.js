const allButtons = document.querySelectorAll(".calculator-controls-button");

const userInput = document.querySelector(".calculator-user-input");
const expression = document.querySelector(".calculator-user-input-operation");
const clearButton = document.querySelector(
  ".calculator-controls-button-operations-c"
);
const equalButton = document.querySelector(
  ".calculator-controls-button-operations-equal"
);
const mnemonic = document.querySelector(
  ".calculator-controls-button-operations-prefix"
);
const actions = ["-", "+", "/", "x", "%"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

let firstNum = "";
let secondNum = "";
let action = "";
let _flag = false;
let _secondFlag = false;
let atAll = 0;
let done = true;
const storage = [];

userInput.textContent = 0;
expression.textContent = 0;

function allClear() {
  firstNum = "";
  secondNum = "";
  action = "";
  _flag = false;
  _secondFlag = false;
  userInput.textContent = 0;
  expression.textContent = 0;
}

clearButton.addEventListener("click", () => {
  allClear();
});

mnemonic.addEventListener("click", function () {
  firstNum += "-";
  userInput.textContent = firstNum;
});

function reset() {
  secondNum = "";
}
allButtons.forEach((button) => {
  button.addEventListener("click", function addNums(evt) {
    const key = evt.target.textContent;

    if (digits.includes(key)) {
      if (secondNum === "" && action === "") {
        firstNum += key;
        userInput.textContent = firstNum;
      } else {
        secondNum += key;
        userInput.textContent = secondNum;
      }
    }
    if (firstNum !== "") {
      if (actions.includes(key)) {
        action = key;
        return;
      }
    }
    if (firstNum === "" && secondNum === "") {
      userInput.textContent = 0;
      expression.textContent = 0;
    } else {
      expression.textContent = firstNum + " " + action + " " + secondNum;
    }
  });
});
function allOperations() {
  let firstNumber = Number(firstNum);
  let secondNumber = Number(secondNum);

  switch (action) {
    case "+":
      firstNum = firstNumber + secondNumber;
      break;
    case "-":
      firstNum = firstNumber - secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        userInput.textContent = "Invalid";
        return;
      } else {
        firstNum = firstNumber / secondNumber;
      }
      break;
    case "%":
      firstNum = firstNumber % secondNumber;
    case "x":
      firstNum = firstNumber * secondNumber;
      break;
  }
  userInput.textContent =
    parseFloat(firstNum) % 1 === 0
      ? parseFloat(firstNum)
      : parseFloat(firstNum).toPrecision(2);
  secondNum = "";
  done = true;
  return;
}

equalButton.addEventListener("click", allOperations);
