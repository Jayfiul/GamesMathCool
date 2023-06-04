from flask import Flask, render_template, request

app = Flask(__name__)

# Number of rows and columns in the game grid
ROWS = 6
COLS = 7

# Define the game grid
grid = [[' ' for _ in range(COLS)] for _ in range(ROWS)]

# Define the players
players = ['X', 'O']
current_player = players[0]

@app.route('/')
def index():
    return render_template('index.html', grid=grid)

@app.route('/play', methods=['POST'])
def play():
    column = int(request.form['column'])
    row = drop_piece(column)
    check_winner(row, column)

    return render_template('index.html', grid=grid)

def drop_piece(column):
    for row in range(ROWS - 1, -1, -1):
        if grid[row][column] == ' ':
            grid[row][column] = current_player
            return row

def check_winner(row, col):
    directions = [(1, 0), (0, 1), (1, 1), (-1, 1)]

    for dx, dy in directions:
        count = 0
        x, y = row, col
        while x >= 0 and x < ROWS and y >= 0 and y < COLS and grid[x][y] == current_player:
            count += 1
            x += dx
            y += dy

        x, y = row, col
        while x >= 0 and x < ROWS and y >= 0 and y < COLS and grid[x][y] == current_player:
            count += 1
            x -= dx
            y -= dy

        if count >= 4:
            # We have a winner
            return current_player

    # Switch the player
    toggle_player()

def toggle_player():
    global current_player
    current_player = players[(players.index(current_player) + 1) % len(players)]

if __name__ == '__main__':
    app.run(debug=True)
