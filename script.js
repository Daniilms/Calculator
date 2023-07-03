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

clearButton.addEventListener("click", () => {
  allClear();
});

/* mnemonic.addEventListener("click", function () {
  firstStrInput += "-";
  userInput.textContent = Number(firstStrInput);
}); */

function reset() {
  firstStrInput = "";
}
function createStorage(evt) {
  if (Number(storage[storage.length - 1]) !== NaN) {
    storage.push(evt.target.textContent);
  }
  getStorage();
  console.log(storage);
}
function getStorage() {
  let singleElement = "";
  storage.forEach((el) => {
    singleElement += el;
  });
  if (storage.length <= 3) {
    expression.textContent = singleElement;
  }
}
/* function preAnswer() {
  storage.length >= 3 ? (userInput.textContent = atAll) : console.log("привет");
} */

// слушатель событий для кнопок с цифрами
allNumsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    createStorage(evt);

    if (!_flag) {
      firstStrInput = firstStrInput + evt.target.textContent;
      userInput.textContent = Number(firstStrInput);
    } else {
      secondStrInput += evt.target.textContent;
      userInput.textContent = Number(secondStrInput);
    }
  });
  /*  expression.textContent = firstStrInput + " " + action + " " + secondStrInput; */
});

// слушатель событий для кнопок с действиями
allOperationsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    createStorage(evt);
    if (_flagForAction === false && !infinite) {
      _flag = true;
      _flagForAction = true;
      action = evt.target.textContent;
      console.log("Мы в if", firstStrInput, _flag, atAll);
    } else {
      allOperations();
      firstStrInput = atAll;
      console.log(atAll);
      action = evt.target.textContent;
      _flag = true;
      _flagForAction = false;
      console.log("Мы в else", typeof firstStrInput, _flag, atAll);
    }
  });
  /*   console.log(firstStrInput, secondStrInput, atAll); */
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
  if (storage.length > 3) {
    infinite = true;
  }
  if (storage.length > 3) {
    let lastAction = storage[storage.length - 1];

    expression.textContent = atAll + lastAction + firstStrInput;
    storage = [];
  }
  console.log("Была вызвана функция", atAll, firstStrInput, secondStrInput);
  return;
}
equalButton.addEventListener("click", () => {
  /*  allOperations();
  firstStrInput = atAll; */
  /* firstStrInput = atAll; */
  /* firstStrInput = "";
  secondStrInput = ""; */
});
/* equalButton.addEventListener("click", allOperations); */
