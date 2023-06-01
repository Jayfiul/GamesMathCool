from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

board = [''] * 9
current_player = 'X'
game_over = False
winner = None


def check_game_over():
    global game_over, winner

    # Check rows
    for i in range(3):
        if board[i] == board[i + 3] == board[i + 6] != '':
            game_over = True
            winner = board[i]
            return

    # Check columns
    for i in range(0, 9, 3):
        if board[i] == board[i + 1] == board[i + 2] != '':
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

    # Check for a tie
    if all(cell != '' for cell in board):
        game_over = True


@app.route('/')
def index():
    return render_template('play.html', board=board, current_player=current_player, game_over=game_over, winner=winner)

@app.route('/play', methods=['POST'])
def play_game():
    global board, current_player, game_over, winner

    if not game_over:
        data = request.get_json()
        position = int(data['position'])
        if board[position] == '':
            board[position] = current_player
            check_game_over()
            current_player = 'O' if current_player == 'X' else 'X'

    return jsonify({'board': board, 'current_player': current_player, 'game_over': game_over, 'winner': winner})


@app.route('/reset', methods=['POST'])
def reset_game():
    global board, current_player, game_over, winner
    board = [''] * 9
    current_player = 'X'
    game_over = False
    winner = None
    return jsonify({'board': board, 'current_player': current_player, 'game_over': game_over, 'winner': winner})


if __name__ == '__main__':
    app.run()
