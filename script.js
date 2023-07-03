const allButtons = document.querySelectorAll(".calculator-controls-button");
const allNumsButtons = document.querySelectorAll(
  ".calculator-controls-button-numbers"
);
const allOperationsButtons = document.querySelectorAll(
  ".calculator-controls-button-operations-main"
);
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

let firstStrInput = "";
let secondStrInput = "";
let action = "";
let _flag = false;
let _flagForAction = false;
let atAll = 0;
let storage = [];

function allClear() {
  firstStrInput = "";
  secondStrInput = "";
  action = "";
  _flag = false;
  storage = [];
  userInput.textContent = 0;
  expression.textContent = 0;
}

clearButton.addEventListener("click", () => {
  allClear();
});

mnemonic.addEventListener("click", function () {
  firstStrInput += "-";
  userInput.textContent = firstStrInput;
});

function reset() {
  firstStrInput = "";
}
function createStorage(evt) {
  storage.push(evt.target.textContent);
  getStorage();
  console.log(storage);
}
function getStorage() {
  let some = "";
  storage.forEach((el) => {
    some += el;
  });
  expression.textContent = some;
}

allNumsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    createStorage(evt);
    if (_flag === false) {
      firstStrInput = firstStrInput + evt.target.textContent;
      userInput.textContent = firstStrInput;
    } else {
      secondStrInput += evt.target.textContent;
      userInput.textContent = secondStrInput;
    }
  });
  /*  expression.textContent = firstStrInput + " " + action + " " + secondStrInput; */
});

allOperationsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    createStorage(evt);
    if (_flagForAction === false) {
      _flag = true;
      _flagForAction = true;
      action = evt.target.textContent;
      console.log("Попали сюда", _flagForAction, firstStrInput, secondStrInput);
    } else {
      allOperations();
      reset();
      _flag = false;
      _flagForAction = false;
      console.log(
        "Попали в else",
        _flagForAction,
        firstStrInput,
        secondStrInput
      );
    }
  });
});
/* allButtons.forEach((button) => {
  button.addEventListener("click", function addNums(evt) {
    const key = evt.target.textContent;

    if (digits.includes(key)) {
      if (secondStrInput === "" && action === "") {
        firstStrInput += key;
        userInput.textContent = firstStrInput;
      } else {
        secondStrInput += key;
        userInput.textContent = secondStrInput;
      }
    }
    if (firstStrInput !== "") {
      if (actions.includes(key)) {
        action = key;
        return;
      }
    }
    if (firstStrInput === "" && secondStrInput === "") {
      userInput.textContent = 0;
      expression.textContent = 0;
    } else {
      expression.textContent =
        firstStrInput + " " + action + " " + secondStrInput;
    }
  });
}); */
function allOperations() {
  let firstNumber = Number(firstStrInput);
  let secondNumber = Number(secondStrInput);

  switch (action) {
    case "+":
      atAll = firstNumber + secondNumber;
      break;
    case "-":
      atAll = firstNumber - secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        userInput.textContent = "Invalid";
        return;
      } else {
        atAll = firstNumber / secondNumber;
      }
      break;
    case "%":
      atAll = firstNumber / 100;
    case "x":
      atAll = firstNumber * secondNumber;
      break;
  }
  userInput.textContent =
    parseFloat(atAll) % 1 === 0
      ? parseFloat(atAll)
      : Math.floor(atAll).toPrecision(4);
  secondStrInput = "";

  console.log("Была вызвана функция");
  return;
}

/* equalButton.addEventListener("click", allOperations); */
