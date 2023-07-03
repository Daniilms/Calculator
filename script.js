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
let isStorageEmpty = true;
let isMnemonic = false;
let infinite = false;

function allClear() {
  firstStrInput = "";
  secondStrInput = "";
  action = "";
  _flag = false;
  atAll = 0;
  storage = [];
  infinite = false;
  userInput.textContent = 0;
  expression.textContent = 0;
}
userInput.textContent = 0;
clearButton.addEventListener("click", allClear);

mnemonic.addEventListener("click", getMnemonic);

function getMnemonic() {
  if (firstStrInput === "" || secondStrInput === "") {
    userInput.textContent = "-" + 0;
    isMnemonic = true;
  } else {
    if (!_flag) {
      firstStrInput = "-" + firstStrInput;
      userInput.textContent = Number(firstStrInput);
    } else {
      secondStrInput = "-" + secondStrInput;
      userInput.textContent = Number(secondStrInput);
    }
  }

  console.log(firstStrInput);
}
function createStorage(evt) {
  storage.push(evt.target.textContent);
  getStorage();
  console.log(storage);
}
function getStorage() {
  let singleElement = "";
  if (firstStrInput !== "") {
    storage.forEach((el) => {
      singleElement += el;
    });
    if (storage.length <= 3) {
      expression.textContent = singleElement;
    }
  }
}

// слушатель событий для кнопок с цифрами
allNumsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    createStorage(evt);
    if (!_flag) {
      if (isMnemonic) {
        firstStrInput = "-" + firstStrInput + evt.target.textContent;
        userInput.textContent = Number(firstStrInput);
        isMnemonic = false;
      } else {
        firstStrInput = firstStrInput + evt.target.textContent;
        userInput.textContent = Number(firstStrInput);
      }
    } else {
      if (isMnemonic) {
        secondStrInput = "-" + secondStrInput + evt.target.textContent;
        userInput.textContent = Number(secondStrInput);
        isMnemonic = false;
      } else {
        secondStrInput += evt.target.textContent;
        userInput.textContent = Number(secondStrInput);
      }
    }
  });
});

// слушатель событий для кнопок с действиями
allOperationsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    createStorage(evt);
    if (firstStrInput !== "") {
      if (_flagForAction === false && !infinite) {
        _flag = true;
        _flagForAction = true;
        action = evt.target.textContent;
      } else {
        allOperations(evt);
        firstStrInput = atAll;
        action = evt.target.textContent;
        _flag = true;
        _flagForAction = false;
      }
    }
  });
});

function allOperations(evt) {
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
      atAll = firstNumber / secondNumber;
      break;
    case "x":
      atAll = firstNumber * secondNumber;
      break;
    default:
      userInput.textContent = "Not working!";
  }
  userInput.textContent = atAll;
  if (firstStrInput !== "") {
    if (storage.length > 3) {
      let lastAction = storage[storage.length - 1];
      infinite = true;
      if (atAll !== 0) {
        expression.textContent = atAll + lastAction;
      } else {
        expression.textContent = 0;
      }
      storage = [];
    }
  }
  secondStrInput = "";
  return;
}
equalButton.addEventListener("click", () => {
  allOperations();
  storage = [];
  firstStrInput = atAll;
  _flagForAction = false;
  /*console.log(firstStrInput, secondStrInput); */
  expression.textContent = atAll;
  infinite = true;
  console.log(_flag, _flagForAction, infinite);
});
