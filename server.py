from flask import Flask, render_template, jsonify, request
import json
from jsonHelpers import *

app = Flask(__name__,template_folder='templates', static_folder='static')

listOfCatagories = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"]

@app.route('/')
def index():
    return render_template('primary.html')
@app.route('/goals')
def goals():
    return render_template('goals.html')
@app.route('/history')
def history():
    return render_template('history.html')


@app.route('/data', methods=['POST','GET'])
def data():
    json = request.json
    username = json["username"]
    getUserId(username)
    date = json["date"]
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})
    if(len(returnAllItemValues(userId, date).json) == 0):
        createNewDayData(userId, date)

    return returnAllItemValues(userId, date)


@app.route('/retrieve-data', methods=['POST','GET'])
def retrieve():
    json = request.json
    username = json["username"]
    item = json["item"]
    count = json["count"]
    date = json["date"]
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})

    editItem(userId, item, count, date)
    return jsonify({'total': json["count"]})

"""Get the total quantity of an item from everyday """
@app.route('/total-item-data', methods=['POST','GET'])
def retrieve_quantity_of_item():
    json = request.json
    username = json['username']
    item = json['item']
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})
    return totalItemsJSON(userId, item)


@app.route('/all-item-values', methods=['POST','GET'])
def retrieve_item_values():
    json = request.json
    username = json['username']
    date = json['date']
    getUserId(username)
    userId = getUserId(username)[0]
    if(len(returnAllItemValues(userId, date).json) == 0):
        createNewDayData(userId, date)
    if userId == -1:
        return jsonify({'error', 'noUser'})
    return returnAllItemValues(userId, date)

@app.route('/all-goal-values', methods=['POST','GET'])
def retrieve_goals():
    json = request.json
    username = json['username']
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})
    goalList = getGoals(userId)
    if(len(goalList) == 0):
        for i in range(9):
            addGoal(listOfCatagories[i], 50, userId)
    goalDict = {}
    for goal in goalList:
        goalDict[goal[0]] = goal[1]
    return jsonify(goalDict)

@app.route('/input-goal-values', methods=['POST','GET'])
def input_goal():
    json = request.json
    username = json['username']
    goal = json['goal']
    item = json['item']
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})
    editGoals(userId, item , goal)
    return jsonify({"set" : "success"})


@app.route('/daily-goal-values', methods=['POST','GET'])
def retrieve_daily_goal():
    json = request.json
    username = json['username']
    date = json['date']
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})
    return jsonify({"daily_goal": getDGs(userId, date)})

@app.route('/input-daily-goal-values', methods=['POST','GET'])
def input_daily_goal():
    json = request.json
    username = json["username"]
    goal = json["goal"]
    date = json["date"]
    userId = getUserId(username)[0]
    if userId == -1:
        return jsonify({'error', 'noUser'})
    editDG(userId, goal, date)
    return jsonify({"daily_goal": getDGs(userId, date)})
    # return jsonify({"daily_goal": 923})

@app.route('/login', methods=['POST','GET'])
def  new_user_request():
    json = request.json
    username = json["username"]
    if(getUserId(username) == -1):
        return jsonify({"login": "fail"})
    return jsonify({"login": "success"})

@app.route('/new-user', methods=['POST','GET'])
def login_request():
    json = request.json
    username = json["username"]
    addUser(username)
    userId = getUserId(username)[0]
    #give quantities
    return jsonify({"login": "success"})