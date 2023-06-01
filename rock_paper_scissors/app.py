from flask import Flask, render_template, request
import random

app = Flask(__name__)
results = []
player_score = 0
computer_score = 0

@app.route('/', methods=['GET', 'POST'])
def play_game():
    global player_score, computer_score, results
    if request.method == 'POST':
        player_choice = request.form['choice']
        computer_choice = random.choice(['rock', 'paper', 'scissors'])
        result, player_choice_img, computer_choice_img = get_winner(player_choice, computer_choice)
        results.append((len(results) + 1, player_choice, computer_choice, result))
        if result == "You win!":
            player_score += 1
        elif result == "Computer wins!":
            computer_score += 1
        return render_template('index.html', result=result, player_choice=player_choice, computer_choice=computer_choice, player_choice_img=player_choice_img, computer_choice_img=computer_choice_img, results=results[::-1], player_score=player_score, computer_score=computer_score)

    return render_template('index.html', results=results[::-1], player_score=player_score, computer_score=computer_score)

# Rest of your code...

def get_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return "It's a tie!", f"{player_choice}.jpg", f"{computer_choice}.jpg"
    elif (
        (player_choice == 'rock' and computer_choice == 'scissors') or
        (player_choice == 'paper' and computer_choice == 'rock') or
        (player_choice == 'scissors' and computer_choice == 'paper')
    ):
        return "You win!", f"{player_choice}.jpg", f"{computer_choice}.jpg"
    else:
        return "Computer wins!", f"{player_choice}.jpg", f"{computer_choice}.jpg"

if __name__ == '__main__':
    app.run(debug=True)
