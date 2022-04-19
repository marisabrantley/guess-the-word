// Targeting where guessed letters will appear.
const guessedLettersElement = document.querySelector('.guessed-letters');
// Targeting the guess button.
const guessButton = document.querySelector('.guess');
// Targeting where player will guess a letter.
const textInput =  document.querySelector('.letter');
//Targeting where the word-in-progress will apppear.
const wordInProgress = document.querySelector('.word-in-progress');
//Targeting where remaining guesses will display.
const remainingGuessesElement = document.querySelector('.remaining');
//Targeting the span inside the paragraph where remaining guesses will dsiplay.
const remainingGuessesSpan = document.querySelector('.remaining span');
//Targeting where messages will appear when player guesses a letter.
const message = document.querySelector('.message');
//Targeting the hidden button that'll appear asking to play again.
const playAgainButton = document.querySelector('.play-again');

let word = 'magnolia';
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async () => {
    const res = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
    const data = await res.text();
    // console.log(data);
    const wordArray = data.split('\n');
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Starts game
getWord();

//Displays circle placeholders for each chosen letter.
const placeholder = word => {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push('●');
    }   
    wordInProgress.innerText = placeholderLetters.join('');
};

guessButton.addEventListener('click', (e) => {
    e.preventDefault();
    message.innerText = '';
    const guess= textInput.value;
    const goodGuess = validateInput(guess);
    // console.log(goodGuess);

    if (goodGuess) {
        makeGuess(guess);
    }

    textInput.value = '';
});

const validateInput = input => {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
    message.innerText = 'Please enter a letter.';
    } else if (input.length > 1) {
        message.innerText = "You've entered too many letters.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = 'Please try a letter from A to Z.';
    } else {
        return input;
    }
};

const makeGuess = guess => {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter. Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateRemainingGuesses(guess);
        showGuessedLetters();
        updatedWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = () => {
    // Clears the list first
    guessedLettersElement.innerHTML = '';
    for (const letter of guessedLetters) {
        const li = document.createElement('li');
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Replaces circle symbols with correct letter guesses.
const updatedWordInProgress = guessedLetters => {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split('');
    // console.log(wordArray);
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else  {
            showWord.push('●');
        }  
    }
    wordInProgress.innerText = showWord.join('');
    ifWonGame();
};

const updateRemainingGuesses = guess => {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        // Number of guesses decreases after bad guess.
        message.innerText = `The word has no ${guess}. Try again!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Letter ${guess} is in the word. Great job!`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    };
    
};

const ifWonGame = () => {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add('win');
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';

        startOver();
    }
};

const startOver = () => {
    guessButton.classList.add('hide');
    remainingGuessesElement.classList.add('hide');
    guessedLettersElement.classList.add('hide');
    playAgainButton.classList.remove('hide');
};

playAgainButton.addEventListener('click', () => {
    // Resets values
    message.classList.remove('win');
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = '';
    message.innerText = '';

    getWord();

    guessButton.classList.remove('hide');
    playAgainButton.classList.add('hide');
    remainingGuessesElement.classList.remove('hide');
    guessedLettersElement.classList.remove('hide');
});