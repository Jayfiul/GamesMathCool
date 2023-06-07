from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
board = []
player = 1
scores = {'Player 1': 0, 'Player 2': 0}
num_boxes = 0

# Initialize the board
def init_board():
    global board, num_boxes
    board = [['.' for _ in range(11)] for _ in range(11)]
    num_boxes = 0

# Check if a box is completed
def check_box(row, col):
    global board, num_boxes, scores
    if row % 2 == 0 and col % 2 == 0:
        if board[row-1][col] != '.' and board[row+1][col] != '.' and board[row][col-1] != '.' and board[row][col+1] != '.':
            if board[row][col] == '.':
                # Fill the box with player's initial
                board[row][col] = scores['Player ' + str(player)][0].upper()
                scores['Player ' + str(player)] += 1
                num_boxes += 1
                return True
    return False

# Switch player
def switch_player():
    global player
    player = 2 if player == 1 else 1

# Route for the game page
@app.route('/')
def game():
    return render_template('game.html', board=board, scores=scores)

# Route for handling moves
@app.route('/move', methods=['POST'])
def move():
    global board, player
    row = int(request.form['row'])
    col = int(request.form['col'])
    if row % 2 == 0 and col % 2 == 1 and board[row][col] == '.':
        # Connect the dots vertically
        board[row][col] = '|'
        # Check if a box is completed
        if not check_box(row, col):
            switch_player()
    elif row % 2 == 1 and col % 2 == 0 and board[row][col] == '.':
        # Connect the dots horizontally
        board[row][col] = '-'
        # Check if a box is completed
        if not check_box(row, col):
            switch_player()
    return jsonify({'success': True})

# Route for resetting the game
@app.route('/reset')
def reset():
    global scores
    init_board()
    scores = {'Player 1': 0, 'Player 2': 0}
    return redirect('/')

if __name__ == '__main__':
    init_board()
    app.run(debug=True)
