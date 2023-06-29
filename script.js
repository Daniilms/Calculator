const allNums = document.querySelectorAll(
  ".calculator-controls-button-numbers"
);
const allButtons = document.querySelectorAll(".calculator-controls-button");
const allActions = document.querySelectorAll(
  ".calculator-controls-button-operations"
);
const userInput = document.querySelector(".calculator-user-input");
const expression = document.querySelector(".calculator-user-input-operation");
const clearButton = document.querySelector(
  ".calculator-controls-button-operations-c"
);
const equalButton = document.querySelector(
  ".calculator-controls-button-operations-equal"
);

const actions = ["-", "+", "/", "x", "%"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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
        console.log(firstNum);
      } else if (firstNum !== "" && secondNum !== "" && done) {
        secondNum += key;
        done = false;
        userInput.textContent = secondNum;
      } /* else if (firstNum !== "" && secondNum !== "" && storage.length >= 2) {
        allOperations(evt);
        secondNum += key;
        expression.textContent = firstNum;
      } */ else {
        secondNum += key;
        userInput.textContent = secondNum;
        console.log(secondNum);
      }
    } /* else {
    } */

    if (actions.includes(key)) {
      action = key;
      storage.push(action);
      console.log(action);
      /* return; */
    }

    console.log(storage);
    expression.textContent = firstNum + action + secondNum;
    /*     if (button.classList.contains("calculator-controls-button-numbers")) {
      if (!_flag) {
        firstNum += evt.target.textContent;
        userInput.textContent = firstNum;
      } else {
        secondNum += evt.target.textContent;
        userInput.textContent = secondNum;
      }
    } else {
      if (
        !evt.target.classList.contains(
          "calculator-controls-button-operations-c"
        ) &&
        !evt.target.classList.contains(
          "calculator-controls-button-operations-equal"
        )
      ) {
        action = evt.target.textContent;
        if (actions.length >= 2) {
          _flag = false;
          action = evt.target.textContent;
        } else {
          actions.push(action);
          console.log(actions);
          _flag = true;
        }
        console.log(firstNum);
        console.log(secondNum);
        if (firstNum === "") {
          _flag = false;
          action = "";
        } else {
          _flag = true;
          action = evt.target.textContent;
          actions.push(action);
          console.log(actions);
        }
      }
    }

    if (atAll !== 0) {
      _flag = false;
      allClear();

         if (+firstNum !== 0) {
        console.log(+firstNum);
        firstNum = evt.target.textContent;

        userInput.textContent = firstNum;
        console.log("В if");
      } else {
        firstNum = 0;
        userInput.textContent = firstNum;
        console.log("В else");
        return;
      }
    }
    if (firstNum === "" || secondNum === "") {
      expression.textContent = 0;
    } else {
      expression.textContent = firstNum + action + secondNum;
    }
    if (firstNum !== "" && secondNum !== "") {
    } */
  });
});
function allOperations(evt) {
  let firstNumber = Number(firstNum);
  let secondNumber = Number(secondNum);
  const key = evt.target.textContent;
  /* if (_flag || key === "=") { */
  console.log("Зашли");
  console.log(action);
  switch (action) {
    case "+":
      firstNum = firstNumber + secondNumber;
      console.log("Попали сюда", firstNum);
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
    parseFloat(firstNum) % 2 === 0
      ? parseFloat(firstNum)
      : parseFloat(firstNum).toPrecision(2);
  secondNum = "";
  done = true;
  return;
  /*   } */
  /* if (key) */
  /* if (actions.length >= 2) {
    if (action === "-") {
      atAll -= firstNumber;
    }
    if (action === "+") {
      atAll = +firstNumber;
      console.log(atAll);
    }
    if (action === "x") {
      atAll *= firstNumber;
    }
    if (action === "/") {
      atAll = atAll / firstNumber;
    }
  } if { */
  /* if (action === "-") {
    atAll = firstNumber - secondNumber;
  }
  if (action === "+") {
    atAll = firstNumber + secondNumber;
    console.log(atAll);
  }
  if (action === "x") {
    atAll = firstNumber * secondNumber;
  }
  if (action === "/") {
    atAll = firstNumber / secondNumber;
  } */
  /*   } */
  /* if (atAll !== 0) {
    firstNum = 0;
    expression.textContent = atAll;
    userInput.textContent = firstNum;
  } */
  /* firstNum = ""; */
  /*  userInput.textContent = parseFloat(atAll); */

  /*   if (
    evt.target.classList.contains("calculator-controls-button-operations") &&
    atAll !== 0
  ) {
     if (expression.contains("=")) {
      expression.textContent = evt.target.textContent;
    }
    _flag = true;
    firstNum = Number(userInput.textContent);
    secondNum = "";
    secondNum += evt.target.textContent;
    second = Number(secondNum);
    expression.textContent = atAll;
    console.log("Мы зашли");
  } */
}

equalButton.addEventListener("click", allOperations);
