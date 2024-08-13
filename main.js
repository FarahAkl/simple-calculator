const result = document.querySelector(".result");
const buttons = document.querySelectorAll("button");
const specialChar = ["/", "*", "-", "+", "%", "="];
let output = "";
const calculate = (btnValue) => {
  if (btnValue === "=" && btnValue !== "") {
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "c") {
    output = "";
  } else if (btnValue === "Del") {
    output = output.toString().slice(0, -1);
  } else {
    if (btnValue === "" && specialChar.includes(btnValue)) return;
    output += btnValue;
  }
  result.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
