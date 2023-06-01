// script.js

// Initialize the current player
var currentPlayer = "{{ current_player }}";

// Initialize game state variables
var game_over = false;
var winner = null;

// Function to make a move
function makeMove(position) {
    if (game_over) {
        return; // Ignore the click if the game is already over
    }

    // Get the button element for the corresponding position
    var button = document.getElementById("cell-" + position);

    // Check if the button is already marked
    if (button.innerText !== "") {
        return; // Ignore the click if the button is already marked
    }

    // Set the current player's symbol (X or O) on the button
    button.innerText = currentPlayer;

    // Switch the current player
    currentPlayer = (currentPlayer === "X") ? "O" : "X";

    // Update the current player display
    var currentPlayerElement = document.getElementById("current-player");
    currentPlayerElement.innerText = currentPlayer;

    // Send the move to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/play', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            board = response.board;
            current_player = response.current_player;
            game_over = response.game_over;
            winner = response.winner;
            updateBoard();
            updatePlayer();
            if (game_over) {
                showWinner();
            }
        }
    };
    xhr.send('position=' + position);
}

// Function to reset the game
function resetGame() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/reset', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            board = response.board;
            current_player = response.current_player;
            game_over = response.game_over;
            winner = response.winner;
            updateBoard();
            updatePlayer();
            hideWinner();
        }
    };
    xhr.send();
}

// Function to update the game board
function updateBoard() {
    for (var i = 0; i < board.length; i++) {
        var cell = document.getElementById('cell-' + i);
        cell.textContent = board[i];
    }
}

// Function to update the current player
function updatePlayer() {
    var currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = current_player;
}

// Function to show the winner screen
function showWinner() {
    var winnerScreen = document.getElementById('winner-screen');
    if (winner) {
        winnerScreen.textContent = 'Player ' + winner + ' wins!';
    } else {
        winnerScreen.textContent = "It's a tie!";
    }
    winnerScreen.style.display = 'block';

    // Disable all buttons after the game is over
    var buttons = document.querySelectorAll("button[id^='cell-']");
    buttons.forEach(function(button) {
        button.disabled = true;
    });
}

// Function to hide the winner screen
function hideWinner() {
    var winnerScreen = document.getElementById('winner-screen');
    winnerScreen.style.display = 'none';
}

// Check if the game is over and display the appropriate message on page load
window.onload = function() {
    if (game_over) {
        showWinner();
    }
};
