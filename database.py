import sqlite3

cursor = sqlite3.connect("data/main.db")

"""
Add a new user to a database

username - login username
email - login email
password - login password (encryption later!)

no returns
"""
def addUser(username, email, password):
    sql = "INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)"
    val = (username, email, password)

    cursor.execute(sql, val)

    cursor.commit()

    return

"""
Get the ID of an user

username - login username

returns the user ID
integer (if username exists)
-1      (if username does not exist)
"""
def getUserId(username):
    sql = "SELECT id FROM accounts WHERE username=?"
    val = (username,)

    data = cursor.execute(sql, val)

    if (len(data) < 1):
        return -1
    return data[0]

"""
Add a new item entry to the database

item - a string containing the name of the item
quantity - an integer of how much of the item
date - the date that the item is added
user - integer of user ID (Use getUserId)

no returns
"""
def addItem(item, quantity, date, user):
    sql = "INSERT INTO items (item, quantity, date, user_id) VALUES (?, ?, ?, ?)"
    val = (item, quantity, date, user)

    cursor.execute(sql, val)

    cursor.commit()

    return

"""
Add a new goal entry to the database

item - a string containing the name of the item
quantity - an integer of how much of the item
user - integer of user ID (Use getUserId)

no returns
"""
def addGoal(item, quantity, user):
    sql = "INSERT INTO goals (item, quantity, user_id) VALUES (?, ?, ?)"
    val = (item, quantity, user)

    cursor.execute(sql, val)

    cursor.commit()

    return

"""
Edit a currently existing goal in the database

user - integer of user ID (Use getUserId)
item - a string containing the name of the item
quantity - an integer of how much of the item

no returns
"""
def editGoals(user, item, quantity):
    sql = "UPDATE goals SET quantity=? WHERE user_id=? AND item=?"
    val = (quantity, user, item)

    cursor.execute(sql, val)

    db.commit()

    return

"""
Get a 2D list of items and their quantity based on a date

user - integer of user ID (Use getUserId)
date - the date that you are filtering by

returns a list of tuples ( name , quantity )
Ex. 
(
    ('glass', 9)
    ('metal', 8)
    ('cardboard', 4)
)
"""
def getItems(user, date):
    sql = "SELECT item, quantity FROM items WHERE user_id=? AND date=?"
    val = (user, date)
    with sqlite3.connect("data/main.db") as conn:
        data = list(conn.execute(sql, val))
    conn.close()

    return data

"""
Edit a currently existing item in the database

user - integer of user ID (Use getUserId)
item - a string containing the name of the item
quantity - an integer of how much of the item
date - the date that the item is added

no returns
"""
def editItem(user, item, quantity, date):
    sql = "UPDATE items SET quantity=? WHERE user_id=? AND item=? AND date=?"
    val = (quantity, user, item, date)

    cursor.execute(sql, val)

    db.commit()

    return

"""
Get the total quantity of an item from everyday

user - integer of user ID (Use getUserId)
item - a string containing the name of the item

returns the quantity (integer)
"""
def getTotalItems(user, item):
    sql = "SELECT quantity FROM items WHERE user_id=? AND item=?"
    val = (user, item)

    with sqlite3.connect("data/main.db") as conn:
        data = list(conn.execute(sql, val))
    conn.close()

    sum = 0
    for item in data:
      sum += item[0]

    return sum

print("Succesfully connected to DB")
cursor.close()