function Square(num) {
    return Math.pow(num,2);
}

var userInput = parseFloat(prompt("Please enter a number: "));
console.log(Square(userInput));