function makeMove(position) {
    fetch('/play', {
        method: 'POST',
        body: JSON.stringify({ position }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        updateBoard(data.board);
        document.querySelector('p').textContent = 'Current Player: ' + data.current_player;
        if (data.game_over) {
            if (data.winner) {
                document.querySelector('h2').textContent = 'Player ' + data.winner + ' wins!';
            } else {
                document.querySelector('h2').textContent = 'It\'s a tie!';
            }
        }
    });
}

function resetGame() {
    fetch('/reset')
    .then(response => response.json())
    .then(data => {
        updateBoard(data.board);
        document.querySelector('p').textContent = 'Current Player: ' + data.current_player;
        document.querySelector('h2').textContent = '';
    });
}

function updateBoard(board) {
    const cells = document.querySelectorAll('td a');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = board[i];
    }
}
