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
    conn.execute("CREATE TABLE accounts (id SERIAL PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))")
    conn.execute("CREATE TABLE items (id SERIAL PRIMARY KEY, item VARCHAR(255), quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")
    conn.execute("CREATE TABLE goals (id SERIAL PRIMARY KEY, item VARCHAR(255), quantity INT, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")
    conn.execute("CREATE TABLE daily_goals (id SERIAL PRIMARY KEY, quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")

"""
Add a new user to a database

username - login username
email - login email
password - login password (encryption later!)

no returns
"""
def addUser(username, email, password):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "INSERT INTO accounts (username, email, password) VALUES (%s, %s, %s)"
    val = (username, email, password)

    conn.execute(sql, val)

    db.commit()

    conn.close()

    return
    
def addUser(username):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "INSERT INTO accounts (username, email, password) VALUES (%s, %s, %s)"
    val = (username, "N/A", "N/A")

    conn.execute(sql, val)

    db.commit()

    conn.close()

    return

"""
Get the ID of an user

username - login username

returns the user ID
integer (if username exists)
-1      (if username does not exist)
"""
def getUserId(username):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT id FROM accounts WHERE username=%s"
    val = (username,)

    conn.execute(sql, val)
    data = conn.fetchall()

    conn.close()

    if (len(data) < 1):
        return -1
    return list(data)[0]

"""
Add a new goal entry to the database

item - a string containing the name of the item
quantity - an integer of how much of the item
user - integer of user ID (Use getUserId)

no returns
"""
def addGoal(item, quantity, user):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "INSERT INTO goals (item, quantity, user_id) VALUES (%s, %s, %s)"
    val = (item, quantity, user)

    conn.execute(sql, val)

    db.commit()

    conn.close()

    return

"""
Edit a currently existing goal in the database

user - integer of user ID (Use getUserId)
item - a string containing the name of the item
quantity - an integer of how much of the item

no returns
"""
def editGoals(user, item, quantity):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()
    
    sql = "UPDATE goals SET quantity=%s WHERE user_id=%s AND item=%s"
    val = (quantity, user, item)

    conn.execute(sql, val)

    db.commit()

    conn.close()

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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT item, quantity FROM goals WHERE user_id=%s"
    val = (user,)

    conn.execute(sql, val)
    data = conn.fetchall()

    conn.close()

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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "INSERT INTO items (item, quantity, date, user_id) VALUES (%s, %s, %s, %s)"
    val = (item, quantity, date, user)

    conn.execute(sql, val)

    db.commit()

    conn.close()

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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT item, quantity FROM items WHERE user_id=%s AND date=%s"
    val = (user, date)

    conn.execute(sql, val)
    data = conn.fetchall()

    conn.close()

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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "UPDATE items SET quantity=%s WHERE user_id=%s AND item=%s AND date=%s"
    val = (quantity, user, item, date)

    if (itemExists(user, item, date) == 0):
        addItem(item, quantity, date, user)
    else:
        conn.execute(sql, val)
    db.commit()
    conn.close()
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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT id FROM items WHERE user_id=%s AND item=%s AND date=%s"
    val = (user, item, date)
    
    conn.execute(sql, val)
    data = conn.fetchall()

    conn.close()

    return len(data)

"""
Get the total quantity of an item from everyday

user - integer of user ID (Use getUserId)
item - a string containing the name of the item

returns the quantity (integer)
"""
def getTotalItems(user, item):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT quantity FROM items WHERE user_id=%s AND item=%s"
    val = (user, item)

    conn.execute(sql, val)
    data = conn.fetchall()

    sum = 0
    for item in data:
      sum += item[0]

    conn.close()

    return sum

"""
Add a new daily goal to the database

quantity - an integer of how much of the item
date - the date that the item is added
user - integer of user ID (Use getUserId)

no returns
"""
def addDG(quantity, date, user):
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "INSERT INTO daily_goals (quantity, date, user_id) VALUES (%s, %s, %s)"
    val = (quantity, date, user)

    conn.execute(sql, val)
    db.commit()

    conn.close()

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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT quantity FROM daily_goals WHERE user_id=%s AND date=%s"
    val = (user, date)

    conn.execute(sql, val)
    data = conn.fetchall()

    conn.close()

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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "UPDATE daily_goals SET quantity=%s WHERE user_id=%s AND date=%s"
    val = (quantity, user, date)


    if (DGExists(user, date) == 0):
        addGoal(quantity, date, user)
    else:
        conn.execute(sql, val)
    db.commit()
    conn.close()
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
    db = psycopg2.connect(  database="verceldb",
                        host="ep-calm-paper-a4hcdu85-pooler.us-east-1.aws.neon.tech",
                        user="default",
                        password="cL2Ju1rktQPm",
                        port="5432")

    conn = db.cursor()

    sql = "SELECT id FROM daily_goals WHERE user_id=%s AND date=%s"
    val = (user, date)
    
    conn.execute(sql, val)
    data = conn.fetchall()

    conn.close()

    return len(data)

conn.close()