function add(x,y) { return x+y }
function subtract(x,y) { return x-y }
function multiply(x,y) { return x*y }
function divide(x,y) { return x/y }
function operate(x,y,o) {
  if (o === "+") {
    return add(x,y);
  } else if (o === "-") {
    return subtract(x,y);
  } else if (o === "*") {
    return multiply(x,y);
  } else if (o === "/") {
    return divide(x,y);
  }
}