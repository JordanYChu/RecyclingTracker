from flask import *
import json
from database import *
import server

listOfCatagories = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "styrofoam"]

def totalItemsJSON(user, item):
    return jsonify({'total', getTotalItems(user, item)})


    # empty for now
    return 0
def returnAllItemValues(user, date):
    #empty for new
    itemList = getItems(user,date)
    itemDict = {}
    for item in itemList:
        itemDict[item[0]] = item[1]
    return jsonify(itemDict)





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

