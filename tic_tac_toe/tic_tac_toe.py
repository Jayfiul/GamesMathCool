from flask import Flask, render_template, request, redirect, url_for
from flask import jsonify


app = Flask(__name__)

# Global Variables
board = [''] * 9
current_player = 'X'
game_over = False
winner = None


@app.route('/')
def index():
    return redirect(url_for('play_game'))


@app.route('/play', methods=['POST'])
def play_game():
    global board, current_player, game_over, winner

    if not game_over:
        data = request.get_json()
        position = int(data['position'])
        if board[position] == '':
            board[position] = current_player
            check_game_over()
            toggle_player()

    return jsonify({'board': board, 'current_player': current_player, 'game_over': game_over, 'winner': winner})



@app.route('/reset', methods=['GET', 'POST'])
def reset_game():
    global board, current_player, game_over, winner
    board = [''] * 9
    current_player = 'X'
    game_over = False
    winner = None
    return jsonify({'board': board, 'current_player': current_player, 'game_over': game_over, 'winner': winner})



def check_game_over():
    global game_over, winner

    # Check rows
    for i in range(0, 9, 3):
        if board[i] == board[i + 1] == board[i + 2] != '':
            game_over = True
            winner = board[i]
            returna

    # Check columns
    for i in range(3):
        if board[i] == board[i + 3] == board[i + 6] != '':
            game_over = True
            winner = board[i]
            return

    # Check diagonals
    if board[0] == board[4] == board[8] != '':
        game_over = True
        winner = board[0]
        return

    if board[2] == board[4] == board[6] != '':
        game_over = True
        winner = board[2]
        return

    # Check if all positions are filled (tie)
    if '' not in board:
        game_over = True
        winner = None
        return


def toggle_player():
    global current_player
    if current_player == 'X':
        current_player = 'O'
    else:
        current_player = 'X'


if __name__ == '__main__':
    app.run(debug=True)
