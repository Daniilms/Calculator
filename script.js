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
    /*    if (action == "/" && secondStrInput == "") {
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
    } */
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
    if (firstStrInput !== "") {
      return firstStrInput + action + secondStrInput;
    } else {
      return 0;
    }
  }

  // логика кнопки '.'
  function getDot() {
    underAction = true;
    if (done) {
      _isSecondNumberInput = false;
    }
    if (firstStrInput === "") {
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
    underAction = true;
    if (done) {
      _isSecondNumberInput = false;
    }
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
    underAction = true;
    if (done) {
      _isSecondNumberInput = false;
    }
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
        if (secondStrInput !== "" && secondStrInput !== "0") {
          atAll = firstNumber / secondNumber;
        } else {
          validate();
        }
        break;
      case "x":
        atAll *= Number(secondNumber);

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
      changeFontSize();
      if (done && userInput.textContent !== 0 && !underAction) {
        done = false;
        firstStrInput = "";
        secondStrInput = "";
        action = "";
        _isSecondNumberInput = false;
      }
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
    button.addEventListener("click", function Actions(evt) {
      changeFontSize();
      validate();
      checkForEqual(evt);
      allActionsArray.push(evt.target.textContent);

      if (firstStrInput !== "" && firstStrInput !== 0) {
        if (action === "") {
          _isSecondNumberInput = true;
          action = evt.target.textContent;
        } else {
          allOperations(evt);
          firstStrInput = atAll;
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
  const equalArray = [];
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
