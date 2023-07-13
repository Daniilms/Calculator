(function () {
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
  let done = false;
  let underAction = false;

  let atAll = 0;
  let allActionsArray = [];
  userInput.textContent = Number(0);

  function validate(evt) {
    if ((firstStrInput === "0" || secondStrInput === "0") && action === "/") {
      atAll = "Error";
      setTimeout(() => {
        allClear();
      }, 1500);
    }
    if (
      done &&
      userInput.textContent !== 0 &&
      !underAction &&
      evt.target.classList.contains("calculator-controls-button-numbers")
    ) {
      done = false;
      firstStrInput = "";
      secondStrInput = "";
      action = "";
      _isSecondNumberInput = false;
    }
    if (
      firstStrInput.toString() === "0." &&
      !evt.target.classList.contains("calculator-controls-button-numbers")
    ) {
      allClear();
    }
  }

  // логика кнопки AC
  function allClear() {
    firstStrInput = "";
    secondStrInput = "";
    action = "";
    _isSecondNumberInput = false;
    atAll = 0;
    done = false;
    underAction = false;
    userInput.textContent = 0;
    expression.textContent = makeExpression();
  }

  function makeExpression() {
    if (done) {
      return userInput.textContent;
    }

    if (firstStrInput !== "" && !firstStrInput.toString().startsWith("00")) {
      return firstStrInput + action + secondStrInput;
    } else {
      return 0;
    }
  }

  // логика кнопки '.'
  function getDot(evt) {
    checkForEqual(evt);
    validate(evt);
    if (firstStrInput.toString() !== "0" && secondStrInput !== "0") {
      underAction = true;
    }
    if (done) {
      _isSecondNumberInput = false;
    }

    if (!_isSecondNumberInput && !firstStrInput.toString().includes(".")) {
      if (firstStrInput === "") {
        firstStrInput = "0." + firstStrInput;
        userInput.textContent = firstStrInput;
      } else if (firstStrInput === "0") {
        firstStrInput = "0.";
        userInput.textContent = firstStrInput;
      } else {
        firstStrInput = firstStrInput + ".";
        userInput.textContent = firstStrInput;
      }
    } else if (
      _isSecondNumberInput &&
      !secondStrInput.toString().includes(".")
    ) {
      if (secondStrInput === "") {
        secondStrInput = "0." + secondStrInput;
        userInput.textContent = secondStrInput;
      } else if (secondStrInput === "0") {
        secondStrInput = "0.";
        userInput.textContent = secondStrInput;
      } else {
        secondStrInput = secondStrInput + ".";
        userInput.textContent = secondStrInput;
      }
    }
    isDecimal = true;
    expression.textContent = makeExpression();

    changeFontSize();
  }
  // логика кнопки процента
  function getPercent(evt) {
    checkForEqual(evt);
    validate(evt);
    if (firstStrInput !== "0") {
      underAction = true;
    }
    if (done) {
      _isSecondNumberInput = false;
    }
    if (
      !_isSecondNumberInput &&
      firstStrInput !== "" &&
      firstStrInput !== "0"
    ) {
      firstStrInput = Number(firstStrInput / 100);
      userInput.textContent = firstStrInput;
    } else if (
      _isSecondNumberInput &&
      secondStrInput !== "" &&
      secondStrInput !== "0"
    ) {
      secondStrInput = Number(secondStrInput / 100);
      userInput.textContent = secondStrInput;
    }
    expression.textContent = makeExpression();
    changeFontSize();
  }

  // логика кнопки +/-
  function getNegative(evt) {
    checkForEqual(evt);
    validate(evt);
    if (firstStrInput !== "0" || secondStrInput !== "0") {
      underAction = true;
    }
    if (done) {
      _isSecondNumberInput = false;
    }
    if (
      !_isSecondNumberInput &&
      firstStrInput !== "" &&
      firstStrInput !== "0"
    ) {
      firstStrInput = -1 * firstStrInput;
      userInput.textContent = Number(firstStrInput);
    } else if (
      _isSecondNumberInput &&
      secondStrInput !== "" &&
      secondStrInput !== "0"
    ) {
      secondStrInput = -1 * secondStrInput;
      userInput.textContent = Number(secondStrInput);
    }
  }

  // функция проверки повторного нажатия на 'равно'
  function checkForEqual(evt) {
    if (
      allActionsArray[allActionsArray.length - 1] !== evt.target.textContent &&
      done
    ) {
      secondStrInput = "";
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
        if (secondNumber !== 0 && firstNumber !== 0) {
          atAll = firstNumber / secondNumber;
        } else {
          validate();
        }
        break;
      case "x":
        atAll = firstNumber * secondNumber;
        break;
      default:
        userInput.textContent = "Not working!";
    }

    userInput.textContent = atAll;
    expression.textContent = makeExpression();
    changeFontSize();
    return;
  }

  // слушатель событий для кнопок с цифрами
  allNumsButtons.forEach((button) => {
    button.addEventListener("click", function (evt) {
      isDecimal = false;
      changeFontSize();
      validate(evt);
      if (!_isSecondNumberInput) {
        if (
          firstStrInput.toString().startsWith("0") &&
          firstStrInput.toString().indexOf(".") !== 1
        ) {
          firstStrInput =
            firstStrInput.toString().slice(1) + evt.target.textContent;
          userInput.textContent = Number(firstStrInput);
        } else {
          firstStrInput = firstStrInput + evt.target.textContent;
          userInput.textContent = Number(firstStrInput);
        }
      } else {
        if (
          secondStrInput.toString().startsWith("0") &&
          secondStrInput.toString().indexOf(".") !== 1
        ) {
          secondStrInput =
            secondStrInput.toString().slice(1) + evt.target.textContent;
          userInput.textContent = Number(secondStrInput);
        } else {
          secondStrInput = secondStrInput + evt.target.textContent;
          userInput.textContent = Number(secondStrInput);
        }
      }
      expression.textContent = makeExpression();
    });
  });

  // слушатель событий для кнопок с действиями
  allOperationsButtons.forEach((button) => {
    button.addEventListener("click", function (evt) {
      changeFontSize();
      checkForEqual(evt);
      validate(evt);
      allActionsArray.push(evt.target.textContent);

      if (firstStrInput !== "" && firstStrInput !== 0) {
        if (action === "") {
          _isSecondNumberInput = true;
          action = evt.target.textContent;
        } else {
          allOperations(evt);
          if (!done) {
            firstStrInput = atAll;
          }
          secondStrInput = "";
          done = false;
          action = evt.target.textContent;
          _isSecondNumberInput = true;
        }
      }

      expression.textContent = makeExpression();
    });
  });

  // нажатие кнопки "равно"
  equalButton.addEventListener("click", (evt) => {
    allOperations();
    changeFontSize();
    checkForEqual(evt);

    done = true;
    allActionsArray.push(evt.target.textContent);
    firstStrInput = atAll;
    expression.textContent = makeExpression();
  });

  clearButton.addEventListener("click", allClear);
  negativeButton.addEventListener("click", getNegative);
  percentButton.addEventListener("click", getPercent);
  dotButton.addEventListener("click", getDot);
})();
