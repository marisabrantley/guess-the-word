// Targeting where guessed letters will appear.
const guessedLettersElement = document.querySelector('.guessed-letters');
// Targeting the guess button.
const guessButton = document.querySelector('.guess');
// Targeting where player will guess a letter.
const textInput =  document.querySelector('.letter');
//Targeting where the word-in-progress will apppear.
const wordInProgress = document.querySelector('.word-in-progress');
//Targeting where remaining guesses will display.
const remainingGuesses = document.querySelector('.remaining');
//Targeting the span inside the paragraph where remaining guesses will dsiplay.
const remainingGuessesSpan = document.querySelector('.remaining span');
//Targeting where messages will appear when player guesses a letter.
const message = document.querySelector('.message');
//Targeting the hidden button that'll appear asking to play again.
const playAgainButton = document.querySelector('.play-again');

const word = 'magnolia';
const guessedLetters = [];

//Displays circle placeholders for each chosen letter.
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push('●');
    }   
    wordInProgress.innerText = placeholderLetters.join('');

};

placeholder(word);

guessButton.addEventListener('click', function (e) {
    e.preventDefault();
    message.innerText = '';

    const guess= textInput.value;

    const goodGuess = validateInput(guess);
    console.log(goodGuess);

    if (goodGuess) {
        makeGuess(guess);
    }

    textInput.value = '';
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
    message.innerText = 'Please enter a letter.';
    } else if (input.length > 1) {
        message.innerText = "You've entered too many letters.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = 'Please try another letter.';
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter. Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

