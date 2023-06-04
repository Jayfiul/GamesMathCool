document.addEventListener('DOMContentLoaded', function () {
    var gameBoardElement = document.querySelector('.game-board');
    var messageElement = document.getElementById('message');
    var player1ScoreElement = document.getElementById('player1-score');
    var player2ScoreElement = document.getElementById('player2-score');
    var resetButton = document.getElementById('reset-button');

    var cards = [];
    var openedCards = [];
    var matchedCards = [];
    var currentPlayer = 1;
    var player1Score = 0;
    var player2Score = 0;

    // Define the symbols for the cards
    var symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    // Generate the cards and shuffle them
    function generateCards() {
        for (var i = 0; i < symbols.length; i++) {
            cards.push({ symbol: symbols[i], flipped: false });
            cards.push({ symbol: symbols[i], flipped: false });
        }
        shuffleCards();
    }

    // Shuffle the cards using the Fisher-Yates algorithm
    function shuffleCards() {
        var currentIndex = cards.length;
        var temporaryValue;
        var randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }
    }

    // Create the game board
    function createGameBoard() {
        for (var i = 0; i < cards.length; i++) {
            var cardElement = document.createElement('div');
            cardElement.classList.add('card', 'hidden');
            cardElement.dataset.index = i;
            cardElement.addEventListener('click', revealCard);
            gameBoardElement.appendChild(cardElement);
        }
    }

    // Reveal a card when clicked
    function revealCard() {
        var cardIndex = parseInt(this.dataset.index);

        if (openedCards.length < 2 && !cards[cardIndex].flipped && !matchedCards.includes(cardIndex)) {
            this.textContent = cards[cardIndex].symbol;
            this.classList.remove('hidden');
            cards[cardIndex].flipped = true;
            openedCards.push(cardIndex);

            if (openedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // Check if the opened cards match
    function checkMatch() {
        var card1 = openedCards[0];
        var card2 = openedCards[1];

        if (cards[card1].symbol === cards[card2].symbol) {
            matchedCards.push(card1, card2);
            if (currentPlayer === 1) {
                player1Score++;
                player1ScoreElement.textContent = player1Score;
            } else {
                player2Score++;
                player2ScoreElement.textContent = player2Score;
            }

            if (matchedCards.length === cards.length) {
                if (player1Score > player2Score) {
                    messageElement.textContent = 'Player 1 wins!';
                } else if (player1Score < player2Score) {
                    messageElement.textContent = 'Player 2 wins!';
                } else {
                    messageElement.textContent = 'It\'s a tie!';
                }
            }
        } else {
            var cardElements = document.querySelectorAll('.card');
            cardElements[card1].textContent = '';
            cardElements[card2].textContent = '';
            cardElements[card1].classList.add('hidden');
            cardElements[card2].classList.add('hidden');
            cards[card1].flipped = false;
            cards[card2].flipped = false;
        }

        openedCards = [];
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
    }

    // Reset the game
    function resetGame() {
        cards = [];
        openedCards = [];
        matchedCards = [];
        currentPlayer = 1;
        player1Score = 0;
        player2Score = 0;
        messageElement.textContent = '';
        player1ScoreElement.textContent = player1Score;
        player2ScoreElement.textContent = player2Score;
        gameBoardElement.innerHTML = '';

        generateCards();
        createGameBoard();
    }

    // Start the game
    generateCards();
    createGameBoard();

    resetButton.addEventListener('click', resetGame);
});
