let emojis = [];
let flippedSquares = [];
let canFlip = true;

document.addEventListener('DOMContentLoaded', function () {
    initializeGame();
});

function initializeGame() {
    emojis = ['😀', '😊', '😎', '🥳', '🚀', '🌈', '🎉', '🌍', '🍕', '🎸', '🏆', '🍦', '🎩', '🚲', '🌺', '📚', '🎨', '🍭', '🎤', '🏰', '🎳', '🚢', '🍔', '🎸'];
    // Duplicate emojis to have pairs
    const emojisPairs = emojis.concat(emojis);

    // Shuffle the array
    const shuffledEmojis = shuffleArray(emojisPairs);

    // Clear the game area
    const memoryGame = document.querySelector('.memory-game');
    memoryGame.innerHTML = '';

    shuffledEmojis.forEach(emoji => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = '<span class="hidden">' + emoji + '</span>';
        memoryGame.appendChild(square);

        square.addEventListener('click', function () {
            flipSquare(square);
        });
    });

    flippedSquares = [];
    canFlip = true;
    hidePlayAgainButton();
}

function flipSquare(square) {
    if (canFlip && !square.classList.contains('flipped') && flippedSquares.length < 2) {
        square.classList.add('flipped');
        flippedSquares.push(square);

        if (flippedSquares.length === 2) {
            canFlip = false;
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [firstSquare, secondSquare] = flippedSquares;
    const emoji1 = firstSquare.querySelector('.hidden').innerHTML;
    const emoji2 = secondSquare.querySelector('.hidden').innerHTML;

    if (emoji1 === emoji2) {
        flippedSquares = [];
        checkWin();
    } else {
        setTimeout(() => {
            firstSquare.classList.remove('flipped');
            secondSquare.classList.remove('flipped');
            flippedSquares = [];
            canFlip = true;
        }, 500);
    }
}

function checkWin() {
    const allFlippedSquares = document.querySelectorAll('.flipped');
    if (allFlippedSquares.length === emojis.length * 2) {
        showPlayAgainButton();
    } else {
        canFlip = true;
    }
}

function showPlayAgainButton() {
    const playAgainButton = document.querySelector('.play-again');
    playAgainButton.style.display = 'block';
}

function hidePlayAgainButton() {
    const playAgainButton = document.querySelector('.play-again');
    playAgainButton.style.display = 'none';
}

function resetGame() {
    initializeGame();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
