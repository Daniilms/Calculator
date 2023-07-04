const allButtons = document.querySelectorAll(".calculator-controls-button");

const allNumsButtons = document.querySelectorAll(
  ".calculator-controls-button-numbers"
);
const allOperationsButtons = document.querySelectorAll(
  ".calculator-controls-button-operations-main"
);
const dotButton = document.querySelector(
  ".calculator-controls-button-operations-dot"
);
const userInput = document.querySelector(".calculator-user-input");
const expression = document.querySelector(".calculator-user-input-operation");
const clearButton = document.querySelector(
  ".calculator-controls-button-operations-c"
);
const equalButton = document.querySelector(
  ".calculator-controls-button-operations-equal"
);
const negativeButton = document.querySelector(
  ".calculator-controls-button-operations-prefix"
);
const percentButton = document.querySelector(
  ".calculator-controls-button-operations-percent"
);

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

userInput.textContent = Number(0);

// логика кнопки AC
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

// логика кнопки '.'
function getDot() {
  if (firstStrInput === "") {
    if (!_flag) {
      firstStrInput = "0." + firstStrInput;
      userInput.textContent = firstStrInput;
    } else {
      secondStrInput = "0." + secondStrInput;
      userInput.textContent = secondStrInput;
    }
    expression.textContent = userInput.textContent;
  } else {
    if (!_flag) {
      firstStrInput = firstStrInput + ".";
      userInput.textContent = firstStrInput;
    } else {
      secondStrInput = secondStrInput + ".";
      userInput.textContent = secondStrInput;
    }
    expression.textContent = userInput.textContent;
  }

  changeFontSize();
}
// логика кнопки процента
function getPercent() {
  if (!_flag) {
    firstStrInput = Number(firstStrInput / 100);
    userInput.textContent = firstStrInput;
  } else {
    secondStrInput = Number(secondStrInput / 100);
    userInput.textContent = secondStrInput;
  }
  expression.textContent = userInput.textContent;
  changeFontSize();
}

// логика кнопки +/-
function getNegative() {
  if (firstStrInput === "") {
    userInput.textContent = 0;
  } else {
    if (!_flag) {
      firstStrInput = -1 * firstStrInput;
      userInput.textContent = Number(firstStrInput);
    } else {
      secondStrInput = -1 * secondStrInput;
      userInput.textContent = Number(secondStrInput);
    }
  }
}

// функция наполнения хранилища для выражения
function fillStorage(evt) {
  storage.push(evt.target.textContent);
  getStorage();
}

// функция перебора и вывода хранилища выражения
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
// изменение размера шрифта при достижении определенной длины вывода.
function changeFontSize() {
  if (userInput.textContent.length >= 7) {
    userInput.classList.add("calculator-user-input-mini");
  } else {
    userInput.classList.remove("calculator-user-input-mini");
  }
}

// логика всех основных (main) операций
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
  changeFontSize();
  secondStrInput = "";
  return;
}

// слушатель событий для кнопок с цифрами
allNumsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    fillStorage(evt);
    changeFontSize();

    if (!_flag) {
      firstStrInput = firstStrInput + evt.target.textContent;
      userInput.textContent = Number(firstStrInput);
    } else {
      secondStrInput = secondStrInput + evt.target.textContent;
      userInput.textContent = Number(secondStrInput);
    }
  });
});

// слушатель событий для кнопок с действиями
allOperationsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    fillStorage(evt);
    changeFontSize();

    if (firstStrInput !== "" && firstStrInput !== 0) {
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

// нажатие кнопки "равно"
equalButton.addEventListener("click", () => {
  allOperations();
  storage = [];
  firstStrInput = atAll;
  _flagForAction = false;
  expression.textContent = atAll;
  /* infinite = true; */
});

clearButton.addEventListener("click", allClear);
negativeButton.addEventListener("click", getNegative);
percentButton.addEventListener("click", getPercent);
dotButton.addEventListener("click", getDot);
