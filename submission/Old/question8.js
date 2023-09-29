var word = ['F', 'O', 'X'];
var guessedLetters = ['_', '_', '_'];


function predictLetter(letter) {
    var foundLetter = false;


    for (var i = 0; i < word.length; i++) {

        if (word[i] === letter) {
            guessedLetters[i] = letter;
            foundLetter = true;
        }
    }

  
    console.log(guessedLetters.join(''));

    if (foundLetter) {
        console.log("Congratulations! You found a new letter.");
    }


    if (guessedLetters.indexOf('_') === -1) {
        console.log("Congratulations! You've won the game. The word is: " + word.join(''));
    }
}


while (guessedLetters.indexOf('_') !== -1) {
    var guessedLetter = prompt("Guess a letter:").toUpperCase(); // Convert to uppercase for consistency
    predictLetter(guessedLetter);
}