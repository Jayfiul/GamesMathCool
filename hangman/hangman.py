from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = 'mysecretkey'

words = ['ching','aziz','monkey']

def get_random_word():
    return random.choice(words)

def initialize_session():
    if 'guessed_letters' not in session:
        session['guessed_letters'] = []

    session['word'] = get_random_word()
    session['chances'] = 6

@app.route('/', methods=['GET', 'POST'])
def play_game():
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
        return render_template('win.html', word=session['word'])

    if session['chances'] == 0:
        return render_template('lose.html', word=session['word'])

    return render_template('play.html', word_display=word_display, chances=session['chances'], guessed_letters=session['guessed_letters'])



@app.route('/reset')
def reset_game():
    session.clear()
    return redirect(url_for('play_game'))

if __name__ == '__main__':
    app.run(debug=True)
