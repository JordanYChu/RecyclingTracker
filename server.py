from flask import Flask, render_template, jsonify
from flask import request


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
    return jsonify({'soft-plastic': 23, "hard-plastic": 65})


#temp variables for testing (soon to be database variables)
@app.route('/retrieve-data', methods=['POST','GET'])
def retrieve():
    json = request.json
    print(json["soft-plastic"])
    print(json["hard-plastic"])
    return jsonify({'title': 1, "body": 3})
