


function CalculateCircle(input) {
    var radius = input/2;

    var square = Math.pow(radius,2);
    
    var area = Math.PI * square;
    var percentage = (square / area) * 100;
    return percentage;
}




var userInput = prompt("Please enter a number:");
userInput = parseInt(userInput);
console.log("percentage : "+CalculateCircle(userInput));