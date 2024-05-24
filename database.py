import mysql.connector

pwd = "temp"
hst = "temp"

db = mysql.connector.connect(
  host=hst,
  user="admin",
  password=pwd,
  port="3306",
  database="main"
)

cursor = db.cursor()

"""
Add a new user to a database

username - login username
email - login email
password - login password (encryption later!)

no returns
"""
def addUser(username, email, password):
    sql = "INSERT INTO accounts (username, email, password) VALUES (%s, %s, %s)"
    val = (username, email, password)

    cursor.execute(sql, val)

    return

"""
Get the ID of an user

username - login username

returns the user ID
integer (if username exists)
-1      (if username does not exist)
"""
def getUserId(username):
    sql = "SELECT id FROM accounts WHERE username=%s"
    val = (username,)

    cursor.execute(sql, val)

    data = cursor.fetchall()

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
    sql = "INSERT INTO items (item, quantity, date, user_id) VALUES (%s, %s, %s, %s)"
    val = (item, quantity, date, user)

    cursor.execute(sql, val)

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
    sql = "SELECT item, quantity FROM items WHERE user_id=%s AND date=%s"
    val = (user, date)

    cursor.execute(sql, val)

    return cursor.fetchall()

"""
Edit a currently existing item in the database

user - integer of user ID (Use getUserId)
item - a string containing the name of the item
quantity - an integer of how much of the item
date - the date that the item is added

no returns
"""
def editItem(user, item, quantity, date):
    sql = "UPDATE items SET quantity=%s WHERE user_id=%s AND item=%s AND date=%s"
    val = (quantity, user, item, date)

    cursor.execute(sql, val)

    return

"""
Get the total quantity of an item from everyday

user - integer of user ID (Use getUserId)
item - a string containing the name of the item

returns the quantity (integer)
"""
def getTotalItems(user, item):
    sql = "SELECT quantity FROM items WHERE user_id=%s AND item=%s"
    val = (user, item)

    cursor.execute(sql, val)

    data = cursor.fetchall()

    sum = 0
    for item in data:
      sum += item[0]

    return sum