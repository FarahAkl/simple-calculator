const screen = document.querySelector(".screen"); // The display area of the calculator
const operators = document.querySelectorAll(".operators"); // Buttons for arithmetic operations
const numbers = document.querySelectorAll(".numbers"); // Buttons for digits and decimal point
const equal = document.querySelector("#equal"); // Button to calculate the result
const clear = document.querySelector("#clear"); // Button to clear the display
const del = document.querySelector("#del"); // Button to delete the last character

let flagDot = null; // Indicates if a decimal point has been used in the current number
let flagOperator = null; // Indicates if the last input was an operator

// Add event listeners for number buttons
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    // Prevent adding multiple decimal points in a single number
    if (
      screen.value.includes(".") &&
      number.innerText == "." &&
      flagDot == false
   )
      return;
    // Clear the display if it shows "Error"
    if (screen.value == "Error") screen.value = "";
    // Append the number or decimal point to the display
    screen.value += number.innerText;
    flagOperator = true; // Allow adding an operator next
    if (number.innerText == ".") flagDot = false; // Reset decimal point flag after adding a decimal
  });
});

// Add event listeners for operator buttons
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    // Append the operator if the last input allows it
    if (flagOperator == true) {
      screen.value += operator.innerText;
      flagDot = true; // Allow decimal point in the next number
      flagOperator = false; // Prevent adding consecutive operators
    }
  });
});

// Add event listener for the equal button
equal.addEventListener("click", () => calcAnswer());

// Function to evaluate and display the result
function calcAnswer() {
  try {
    // Evaluate the current expression and update the display
    screen.value = eval(screen.value);
  } catch (error) {
    // Show "Error" if the expression is invalid
    screen.value = "Error";
  }
}

// Add event listener for the clear button
clear.addEventListener("click", () => {
  // Clear the display and reset flags
  screen.value = "";
  flagOperator = null; // Reset operator flag
  flagDot = null; // Reset decimal point flag
});

// Add event listener for the delete button
del.addEventListener("click", () => {
  // Remove the last character from the display
  screen.value = screen.value.slice(0, -1);

  // Check the new last character to update the operator flag
  const lastChar = screen.value.slice(-1);

  if (["+", "-", "*", "/", "%"].includes(lastChar)) {
    // If the last character is an operator, prevent adding another operator
    flagOperator = false;
  } else {
    // Otherwise, allow adding an operator
    flagOperator = true;
  }
});
