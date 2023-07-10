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
let _isSecondNumberInput = false;
let atAll = 0;

userInput.textContent = Number(0);

function validate() {
  if (action == "/" && secondStrInput == "") {
    setTimeout(() => {
      userInput.textContent = 0;
      expression.textContent = 0;
      atAll = 0;
      firstStrInput = ``;
      secondStrInput = ``;
      _isSecondNumberInput = false;
      action = "";
    }, 2000);
  }
  if (secondStrInput === "0") {
    setTimeout(() => {
      userInput.textContent = 0;
      expression.textContent = 0;
      atAll = 0;
      firstStrInput = ``;
      secondStrInput = ``;
      _isSecondNumberInput = false;
      action = "";
    }, 2000);
  }
}
// логика кнопки AC
function allClear() {
  firstStrInput = "";
  secondStrInput = "";
  action = "";
  _isSecondNumberInput = false;
  atAll = 0;
  userInput.textContent = 0;
  expression.textContent = makeExpression();
}

function makeExpression() {
  if (firstStrInput !== "") {
    return firstStrInput + action + secondStrInput;
  } else {
    return 0;
  }
}

// логика кнопки '.'
function getDot() {
  if (firstStrInput === "" || secondStrInput === "") {
    if (!_isSecondNumberInput) {
      firstStrInput = "0." + firstStrInput;
      userInput.textContent = firstStrInput;
    } else {
      secondStrInput = "0." + secondStrInput;
      userInput.textContent = secondStrInput;
    }
    expression.textContent = makeExpression();
  } else {
    if (!_isSecondNumberInput) {
      firstStrInput = firstStrInput + ".";
      userInput.textContent = firstStrInput;
    } else {
      secondStrInput = secondStrInput + ".";
      userInput.textContent = secondStrInput;
    }
    expression.textContent = makeExpression();
  }

  changeFontSize();
}
// логика кнопки процента
function getPercent() {
  if (!_isSecondNumberInput) {
    firstStrInput = Number(firstStrInput / 100);
    userInput.textContent = firstStrInput;
  } else {
    secondStrInput = Number(secondStrInput / 100);
    userInput.textContent = secondStrInput;
  }
  expression.textContent = makeExpression();
  changeFontSize();
}

// логика кнопки +/-
function getNegative() {
  if (firstStrInput === "") {
    userInput.textContent = 0;
  } else {
    if (!_isSecondNumberInput) {
      firstStrInput = -1 * firstStrInput;
      userInput.textContent = Number(firstStrInput);
    } else {
      secondStrInput = -1 * secondStrInput;
      userInput.textContent = Number(secondStrInput);
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
      secondStrInput !== "" && secondStrInput !== "0"
        ? (atAll = firstNumber / secondNumber)
        : validate();

      console.log("А мы здесь");
      break;
    case "x":
      atAll = firstNumber * secondNumber;
      break;
    default:
      userInput.textContent = "Not working!";
  }
  userInput.textContent = atAll;

  changeFontSize();
  secondStrInput = "";
  return;
}

// слушатель событий для кнопок с цифрами
allNumsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    changeFontSize();
    if (!_isSecondNumberInput) {
      firstStrInput = firstStrInput + evt.target.textContent;
      userInput.textContent = Number(firstStrInput);
    } else {
      secondStrInput = secondStrInput + evt.target.textContent;
      userInput.textContent = Number(secondStrInput);
    }
    expression.textContent = makeExpression();
  });
});

// слушатель событий для кнопок с действиями
allOperationsButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    changeFontSize();
    validate();
    if (firstStrInput !== "" && firstStrInput !== 0) {
      if (action === "") {
        _isSecondNumberInput = true;
        action = evt.target.textContent;
      } else {
        allOperations(evt);
        firstStrInput = atAll;
        action = evt.target.textContent;
        _isSecondNumberInput = true;
      }
    }
    expression.textContent = makeExpression();
  });
});

// нажатие кнопки "равно"
equalButton.addEventListener("click", () => {
  allOperations();
  firstStrInput = atAll;
  action = "";
  expression.textContent = makeExpression();
});

let body = document.querySelector("body");
let demoBtn = document.createElement("button");
demoBtn.textContent = "Button";
body.append(demoBtn);

demoBtn.addEventListener("click", () => {
  console.log(firstStrInput, secondStrInput, action);
});
clearButton.addEventListener("click", allClear);
negativeButton.addEventListener("click", getNegative);
percentButton.addEventListener("click", getPercent);
dotButton.addEventListener("click", getDot);
