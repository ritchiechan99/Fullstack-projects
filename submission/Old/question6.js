function Calculate(num1, operation, num2) {
    switch (operation) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return "Invalid operation";
    }
}

console.log(Calculate(4, "+", 6)); // Must show 10
console.log(Calculate(4, "-", 6)); // Must show -2
console.log(Calculate(2, "*", 0)); // Must show 0
console.log(Calculate(12, "/", 0)); // Must show Infinity