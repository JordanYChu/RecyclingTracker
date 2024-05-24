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

def addUser(username, email, password):
    sql = "INSERT INTO accounts (username, email, password) VALUES (%s, %s, %s)"
    val = (username, email, password)

    cursor.execute(sql, val)

def getUserId(username):
    sql = "SELECT id FROM accounts WHERE username=%s"
    val = (username)

    return cursor.fetchall()

def addItem(item, quantity, date, user_id):
    sql = "INSERT INTO items (item, quantity, date, user_id) VALUES (%s, %s, %s, %s)"
    val = (item, quantity, date, user_id)

    cursor.execute(sql, val)

def getItems(user, date):
    sql = "SELECT item, quantity FROM items WHERE user_id=%s AND date=%s"
    val = (user, date)

    cursor.execute(sql, val)

    return cursor.fetchall()

def editItem(user, item, quantity, date):
    sql = "UPDATE items SET quantity=%s WHERE user_id=%s AND item=%s AND date=%s"
    val = (quantity, user, item, date)

    cursor.execute(sql, val)

    return cursor.fetchall()

def getTotalItems(user, item):
    sql = "SELECT quantity FROM items WHERE user_id=%s AND item=%s"
    val = (user, item)

    cursor.execute(sql, val)

    data = cursor.fetchall()

    sum = 0
    for item in data:
      sum += item[0]

    return sum

#addUser("Isitha2", "Isitha29@outlook.com", "David333")

#addItem("cardboard", 5, '2024-05-17', 1)

val = getItems(1, "2024-05-15")

for x in val:
    print(x)

#db.commit()