var userInput1 = prompt("Please enter first number from 0 - 20:");
var userInput2 = prompt("Please enter second number from 0 - 20:");

num1 = parseInt(userInput1);
num2 = parseInt(userInput2);

if(num1 > num2)
{
    alert(num1+" is bigger than "+num2);
    console.log(num1+" is bigger than "+num2);
}
else
{
    alert(num2+" is bigger than "+num1);
    console.log(num2+" is bigger than "+num1);
}