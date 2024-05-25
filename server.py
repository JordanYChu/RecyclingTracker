from flask import Flask, render_template, jsonify, request
import json

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
    return  jsonify({'soft-plastic': 23, "hard-plastic": 65})


#temp variables for testing (soon to be database variables)
@app.route('/retrieve-data', methods=['POST','GET'])
def retrieve():
    json = request.json
    #
    return jsonify({'title': 1, "body": 3})

"""Get the total quantity of an item from everyday """
@app.route('/total-item-data', methods=['GET'])
def retrieve():
    data = json.loads(request.data)
    user = data['user']
    item = data['item']
    userId = getUserId(user)
    if userId == -1:
        return jsonify({'error', 'noUser'})
    return totalItemsJSON(userID, item)


@app.route('/all-item-values', methods=['GET'])
def retrieve():
    data = json.loads(request.data)
    user = data['user']
    date = data['date']
    userId = getUserId(user)
    if userId == -1:
        return jsonify({'error', 'noUser'})
    return returnAllItemValues(userId, date)


