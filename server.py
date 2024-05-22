from flask import Flask, render_template, jsonify

app = Flask(__name__,template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('primary.html')
@app.route('/goals')
def goals():
    return render_template('goals.html')
@app.route('/history')
def history():
    return render_template('history.html')


@app.route('/data')
def data():
    return jsonify({'name': 'grouch'})