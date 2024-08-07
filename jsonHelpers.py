from flask import *
import json
from database import *
import server

listOfCatagories = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"]
default_goal = 25

def totalItemsJSON(user, item):
    return jsonify({'total': getTotalItems(user, item)})

def returnAllItemValues(user, date):
    #empty for new
    itemList = getItems(user,date)
    itemDict = {}
    for item in itemList:
        itemDict[item[0]] = item[1]
    return jsonify(itemDict)


def createNewDayData(userId, date):
    for i in range(9):
        addItem(listOfCatagories[i], 0, date, userId)
    addDG(default_goal, date, userId)




# def editDatabaseJSON(jsonInfo):
#     '''
#     {
#     item: 
#     quantity:
#     goal:
#     user:
#     }
#     '''
#     infoDict = json.loads(jsonInfo)
#     editItem(user=infoDict["user"], item=infoDict["item"], )

