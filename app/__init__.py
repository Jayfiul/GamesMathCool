from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/brick_break')
def brick_break():
    return render_template('brick_break.html')

@app.route('/level1')
def level1():
    return render_template('level1.html')

@app.route('/level2')
def level2():
    return render_template('level2.html')

@app.route('/level3')
def level3():
    return render_template('level3.html')

@app.route('/tic_tac_toe')
def tic_tac_toe():
    return render_template('tic.html')

@app.route('/connect4')
def connect4():
    return render_template('connect4.html')

# HANGMAN STUFF 
words = ['ching','aziz','monkey']
def get_random_word():
    return random.choice(words)

def initialize_session():
    if 'guessed_letters' not in session:
        session['guessed_letters'] = []

    session['word'] = get_random_word()
    session['chances'] = 6

@app.route('/hangman')
def hangman():
    if 'word' not in session:
        initialize_session()

    if request.method == 'POST':
        letter = request.form['letter']
        session['guessed_letters'] += letter

        if letter not in session['word']:
            session['chances'] -= 1

    word_display = ''
    for char in session['word']:
        if char in session['guessed_letters']:
            word_display += char + ' '
        else:
            word_display += '_ '

    if '_' not in word_display:
        return render_template('hangman_win.html', word=session['word'])

    if session['chances'] == 0:
        return render_template('hangman_lose.html', word=session['word'])

    return render_template('hangman.html', word_display=word_display, chances=session['chances'], guessed_letters=session['guessed_letters'])

@app.route('/hangman_reset')
def hangman_reset():
    session.clear()
    return redirect(url_for('hangman'))

@app.route('/hangman_reset')
def hangman_reset():
    return render_template('hangman.html')

@app.route('/memory')
def memory():
    return render_template('memory.html')

@app.route('/snake')
def snake():
    return render_template('snake.html')

@app.route('/rps')
def rps():
    return render_template('rps.html')

if __name__ == '__main__':
    app.run(debug=True)
