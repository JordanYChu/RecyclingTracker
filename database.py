import psycopg2

# For debugging seperately
# Not for website instance
db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

conn = db.cursor()

def initialize():
    conn.execute("CREATE TABLE accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))")
    conn.execute("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(255), quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")
    conn.execute("CREATE TABLE goals (id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(255), quantity INT, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")
    conn.execute("CREATE TABLE daily_goals (id INTEGER PRIMARY KEY AUTOINCREMENT, quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")

    conn.commit()

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

    conn.execute(sql, val)
    conn.commit()

    return
    
def addUser(username):
    sql = "INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)"
    val = (username, "N/A", "N/A")

    conn.execute(sql, val)
    conn.commit()

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

    data = list(conn.execute(sql, val))

    if (len(data) < 1):
        return -1
    return data[0]

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

    conn.execute(sql, val)
    conn.commit()

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

    conn.execute(sql, val)
    conn.commit()

    return

"""
Get a 2D list of goals and their quantity

user - integer of user ID (Use getUserId)

returns a list of tuples ( name , quantity )
Ex. 
(
    ('glass', 9)
    ('metal', 8)
    ('cardboard', 4)
)
"""
def getGoals(user):
    sql = "SELECT item, quantity FROM goals WHERE user_id=?"
    val = (user,)

    data = list(conn.execute(sql, val))

    return data

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

    conn.execute(sql, val)
    conn.commit()

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

    data = list(conn.execute(sql, val))

    return data

"""
Edit a currently existing item in the database
ALSO runs addItem() if it doesn't exist for user on said date

user - integer of user ID (Use getUserId)
item - a string containing the name of the item
quantity - an integer of how much of the item
date - the date that the item is added

no returns
"""
def editItem(user, item, quantity, date):
    sql = "UPDATE items SET quantity=? WHERE user_id=? AND item=? AND date=?"
    val = (quantity, user, item, date)

    if (itemExists(user, item, date) == 0):
        addItem(item, quantity, date, user)
    else:
        conn.execute(sql, val)
        conn.commit()
    return

"""
Check if the item exists for a certain day and user in the database

user - integer of user ID (Use getUserId)
item - a string containing the name of the item
date - the date that the item is added

returns an integer
0 - does not exists
int of entries - exists
"""
def itemExists(user, item, date):
    sql = "SELECT id FROM items WHERE user_id=? AND item=? AND date=?"
    val = (user, item, date)
    
    data = list(conn.execute(sql, val))

    return len(data)

"""
Get the total quantity of an item from everyday

user - integer of user ID (Use getUserId)
item - a string containing the name of the item

returns the quantity (integer)
"""
def getTotalItems(user, item):
    sql = "SELECT quantity FROM items WHERE user_id=? AND item=?"
    val = (user, item)

    data = list(conn.execute(sql, val))

    sum = 0
    for item in data:
      sum += item[0]

    return sum

"""
Add a new daily goal to the database

quantity - an integer of how much of the item
date - the date that the item is added
user - integer of user ID (Use getUserId)

no returns
"""
def addDG(quantity, date, user):
    sql = "INSERT INTO daily_goals (quantity, date, user_id) VALUES (?, ?, ?)"
    val = (quantity, date, user)

    conn.execute(sql, val)
    conn.commit()

    return

"""
Get a 2D list of daily goals and their quantity based on a date

user - integer of user ID (Use getUserId)
date - the date that you are filtering by

returns a list of tuples ( quantity )
Ex. 
(
    (9)
    (8)
    (4)
)
"""
def getDGs(user, date):
    sql = "SELECT quantity FROM daily_goals WHERE user_id=? AND date=?"
    val = (user, date)

    data = list(conn.execute(sql, val))

    return data

"""
Edit a currently existing daily goal in the database
ALSO runs addGoal() if it doesn't exist for user on said date

user - integer of user ID (Use getUserId)
quantity - an integer of how much of the item
date - the date that the item is added

no returns
"""
def editDG(user, quantity, date):
    sql = "UPDATE daily_goals SET quantity=? WHERE user_id=? AND date=?"
    val = (quantity, user, date)


    if (DGExists(user, date) == 0):
        addGoal(quantity, date, user)
    else:
        conn.execute(sql, val)
        conn.commit()
    return

"""
Check if the daily goal exists for a certain day and user in the database

user - integer of user ID (Use getUserId)
date - the date that the item is added

returns an integer
0 - does not exists
int of entries - exists
"""
def DGExists(user, date):
    sql = "SELECT id FROM daily_goals WHERE user_id=? AND date=?"
    val = (user, date)
    
    data = list(conn.execute(sql, val))

    return len(data)

initialize()
conn.close()