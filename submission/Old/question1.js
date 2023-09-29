var userInput = prompt("Please enter a number:");
var sum = 0;

// Convert the user input to a number
userInput = parseInt(userInput);


for (var i = 0; i <= userInput; i++) {
    
    sum += i;
}

var average = sum / ++userInput;
console.log("The sum of numbers from 1 to " + userInput + " is: " + sum);
console.log("The average is: " + average);
