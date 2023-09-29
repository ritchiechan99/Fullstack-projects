var userInput = parseFloat(prompt("Please enter a number: "));
function ProductOfAllNum(num)
{
    var product = 1;
    
    for(var i = 1; i<= 5; ++i)
    {
        product *= i;
    }
    return product;
}


console.log("The product of "+userInput+" is : "+ProductOfAllNum(userInput));