let displayString = "0";
let exp1 = "";
let exp2 = "";
let oper = "";
let hasInputted = false;

function add(x,y) { return x+y }
function subtract(x,y) { return x-y }
function multiply(x,y) { return x*y }
function divide(x,y) { return x/y }
function operate(x,y,o) {
  if (o == "+") {
    return add(x,y);
  } else if (o == "-") {
    return subtract(x,y);
  } else if (o == "*") {
    return multiply(x,y);
  } else if (o == "/") {
    return divide(x,y);
  }
}

const keys = document.querySelectorAll('.key');
const clear = document.querySelector('.clear');
const answer = document.querySelector('.answer');
keys.forEach(key => key.addEventListener('click', function(e){
  let dataKey = this.attributes[0].value;
  handleInput(dataKey);
}));

function handleInput (dataKey) {
  if (dataKey === "clear") { clearAll(); }
  else if (dataKey == "equals") {
    evaluate();
  }
  else if (displayString.length < 14) {
    if (isOperator(dataKey)) {
      if (!oper == "") { // there's already an operator
        evaluate(dataKey);
      } else if (dataKey == "subtract" && !hasInputted) {
        displayString = "";
        addToString(dataKey);
      } else {
        // console.log("Adding " + dataKey);
        addToString(dataKey);
      }
      hasInputted = true;
    }
    else if (isNumber(dataKey)) {
      if (!hasInputted) {
        clearAll();
      }
      addToString(dataKey);
    }
    else if (dataKey == "period") {
      parseDisplay();
      if (hasInputted) {
        if (exp2 == "") {
          if (!oper == "") {
            addToString(".");
          } else if (!exp1.includes(".")) {
            addToString(".");
          }
        } else if (!exp2.includes(".")) {
          addToString(".");
        }
      } else {
        clearAll();
        addToString(".");
      }
    }
  }
  parseDisplay();
  display();
  // console.log(`${exp1} ${oper} ${exp2}`);
}

function keyToDataKey(key) {
  if (key == "+") {
    return "add";
  } else if (key == "-") {
    return "subtract";
  } else if (key == "*") {
    return "multiply";
  } else if (key == "/") {
    return "divide";
  } else if (key == ".") {
    return "period";
  } else if (key == "=") {
    return "equals";
  } else if (key == "Enter") {
    return "equals";
  } else if (key == "Escape") {
    return "clear";
  } else if (key == "c") {
    return "clear";
  } else if (key == "Delete") {
    return "clear";
  } else if (key == "Backspace") {
    return "clear";
  }
  return key;
}

keys.forEach(key => key.addEventListener('mousedown', function(e) {
  console.log(this);
  this.classList.add('pushing');
}));
keys.forEach(key => key.addEventListener('mouseup', function(e) {
  // console.log(this);
  this.classList.remove('pushing');
}));
keys.forEach(key => key.addEventListener('mouseleave', function(e) {
  // console.log(this);
  this.classList.remove('pushing');
}));

window.addEventListener('keydown', pressKey);
window.addEventListener('keyup', releaseKey);

function pressKey(e) {
  let thisDataKey = keyToDataKey(e.key);
  console.log(thisDataKey);
  let thisKey = document.querySelector(`div[data-key="${thisDataKey}"]`);
  if (thisKey != null) {
    thisKey.classList.add('pushing');
    handleInput(thisDataKey);
  }
}

function releaseKey(e) {
  let thisDataKey = keyToDataKey(e.key);
  // console.log(e.key);
  let thisKey = document.querySelector(`div[data-key="${thisDataKey}"]`);
  if (thisKey != null) {
    thisKey.classList.remove('pushing');
  }
}

function addToString(num) {
  if (displayString == "0" && !isOperator(num)) {
    displayString = "";
  }
  if (isOperator(num)) {
    num = getOperator(num)
  }
  if (num == ".") {
    displayString += "0";
  }
  displayString += num;
  hasInputted = true;
}

function isNumber(value) {
  return value.toString().match(/\d/) ? true : false;
}

function isOperator(value) {
  let operators = ["add", "subtract", "multiply", "divide"];
  return (operators.includes(value) ? true : false);
}

function getOperator(opText) {
  if (opText == "add") {
    return "+";
  } else if (opText == "subtract") {
    return "-";
  } else if (opText == "multiply") {
    return "*";
  } else if (opText == "divide") {
    return "/";
  }
}
// function currentNumHasPeriod() {
//   if (displayString.indexOf(".") === -1) {
//     console.log("No periods here.");
//     return false;
//   } else {
    
//   }
// }

function parseDisplay() {
  let cDisplayString = displayString.toString();
  let cExp1 = "";
  let cExp2 = "";
  let cOper = "";
  for (let i=0; i<cDisplayString.length; i++) {
    let cur = cDisplayString[i];
    if (isNumber(cur) || cur == ".") {
      if (cOper == "") {
        cExp1 += cur;
      } else {
        cExp2 += cur;
      }
    } else if (cur == "-") {
      if (cExp1 == "") {
        cExp1 += cur;
      } else if (cOper != "" && cExp2 == "") {
        cExp2 += cur;
      } else {
        cOper = cur;
      }
    } else {
      cOper = cur;
    }
  }
  exp1 = cExp1;
  exp2 = cExp2;
  oper = cOper;
}

function display() {
  answer.textContent = displayString;
  // roundOff(parseFloat(displayString),3).toString()
}

function clearAll() {
  displayString = "0";
  exp1 = "";
  exp2 = "";
  oper = "";
  hasInputted = false;
  display();
}

function evaluate(dataKey) {
  hasInputted = false;
  if (oper != "") {
    if (exp2 == "") {
      if (oper == "+" || oper == "-") {
        // console.log("0");
        exp2 = 0;
      } else {
        // console.log("1");
        exp2 = 1;
      }
    }
    let answer = operate(parseFloat(exp1),parseFloat(exp2),oper);
    displayString = answer.toString();
    exp1 = answer;
    exp2 = "";
    displayString = roundOff(parseFloat(displayString),5).toString()
    if (isNaN(displayString)) {
      displayString = "NICE TRY";
    } else if (dataKey == undefined) {
      oper = "";
    } else {
      oper = getOperator(dataKey);
      displayString += oper;
      hasInputted = true;
    }
    display();
  }
}

function roundOff(value,round) {
  return (parseInt(value * (10 ** (round + 1))) - parseInt(value * (10 ** round)) * 10) > 4 ? (((parseFloat(parseInt((value + parseFloat(1 / (10 ** round))) * (10 ** round))))) / (10 ** round)) : (parseFloat(parseInt(value * (10 ** round))) / ( 10 ** round));
}

display();