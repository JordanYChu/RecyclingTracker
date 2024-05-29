from flask import Flask, render_template, jsonify, request
import json
from jsonHelpers import *

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
    # return  jsonify({'soft-plastic': 23, "hard-plastic": 65})
    return returnAllItemValues(1, "2024-05-15")


@app.route('/retrieve-data', methods=['POST','GET'])
def retrieve():
    json = request.json
    editItem(1, json["item"], json["count"], "2024-05-15")
    return jsonify({'total': json["count"]})

"""Get the total quantity of an item from everyday """
@app.route('/total-item-data', methods=['POST','GET'])
def retrieve_quantity_of_item():
    json = request.json
    userId = json['userId']
    item = json['item']
    # userId = getUserId(user)
    # if userId == -1:
    #     return jsonify({'error', 'noUser'})
    # return jsonify({'total':4})
    return totalItemsJSON(1, item)


@app.route('/all-item-values', methods=['POST','GET'])
def retrieve_item_values():
    json = request.json
    userId = json['userId']
    date = json['date']
    # return jsonify({'title': 2, "body": 3})
    # userId = getUserId(user)
    # if userID == -1:
    #     return jsonify({'error', 'noUser'})
    return returnAllItemValues(userId, date)

@app.route('/all-goal-values', methods=['POST','GET'])
def retrieve_goals():
    json = request.json
    userId = json['userId']
    goalList = getGoals(userId)
    goalDict = {}
    for goal in goalList:
        goalDict[goal[0]] = goal[1]
    return jsonify(goalDict)


@app.route('/daily-goal-values', methods=['POST','GET'])
def retrieve_daily_goal():
    json = request.json
    userId = json['userId']
    date = json['date']
    print(getDGs(1, "2024-05-15"))
    return jsonify({"daily_goal": getDGs(1, "2024-05-15")})
    # return jsonify({"daily_goal": 923})