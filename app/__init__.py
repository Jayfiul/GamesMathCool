from flask import Flask, render_template

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

if __name__ == '__main__':
    app.run()
