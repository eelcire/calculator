const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const lastOutput = document.querySelector(".last-output");
const currentOutput = document.querySelector(".current-output");
const allClearButton = document.querySelector(".ac");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");

class Calculator {
    constructor(lastOutput, currentOutput) {
        this.lastOutput = lastOutput;
        this.currentOutput = currentOutput;
        this.allClear();
    }
    allClear() {
        this.current = "";
        this.previous = "";
        this.operation = undefined;
    }

    deleteLast() {
        this.current = this.current.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.current.includes(".")) return;
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.current == "") return;
        if (this.previous !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previous);
        const current = parseFloat(this.current);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "%":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.current = computation;
        this.operation = undefined;
        this.previous = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        }   else    {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }   else    {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOutput.innerText = this.getDisplayNumber(this.current);
        if (this.operation) {
            this.lastOutput.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        }   else    {
            this.lastOutput.innerText = "";
        }
    }
}

const calculator = new Calculator(lastOutput, currentOutput)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", button => {
    calculator.allClear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.deleteLast();
    calculator.updateDisplay();
})

document.addEventListener("keydown", keyListener);

function keyListener(button) {
    switch (button.which) {
      case 67:
        calculator.allClear();
        calculator.updateDisplay();
        break;
      case 8:
        calculator.deleteLast();
        calculator.updateDisplay();
        break;
      case 111:
        calculator.chooseOperation();
        calculator.updateDisplay();
        break;
      case 106:
        calculator.chooseOperation();
        calculator.updateDisplay();
        break;
      case 109:
        calculator.chooseOperation();
        calculator.updateDisplay();
        break;
      case 107:
        calculator.chooseOperation();
        calculator.updateDisplay();
        break;
      case 96:
      case 48:
      case 97:
      case 49:
      case 98:
      case 50:
      case 99:
      case 51:
      case 100:
      case 52:
      case 101:
      case 53:
      case 102:
      case 54:
      case 103:
      case 55:
      case 104:
      case 56:
      case 105:
      case 57:
        calculator.appendNumber();
        calculator.updateDisplay();
        break;
      case 13:
        calculator.compute();
        calculator.updateDisplay();
        break;
      case 110:
      case 190:
        calculator.appendNumber();
        calculator.updateDisplay();
        break;
    }
  }