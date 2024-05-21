import mysql.connector

pwd = "temp"

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password=pwd,
  database="main"
)

cursor = db.cursor()

def addUser(username, email, password):
    sql = "INSERT INTO accounts (username, email, password) VALUES (%s, %s, %s)"
    val = (username, email, password)

    cursor.execute(sql, val)

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

def viewTable(table):
  cursor.execute("SELECT * FROM items")

  result = cursor.fetchall()

  for x in result:
    print(x)
  return

#cursor.execute("CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))")
#cursor.execute("CREATE TABLE items (id INT AUTO_INCREMENT PRIMARY KEY, item VARCHAR(255), quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")
#cursor.execute("CREATE TABLE goals (id INT AUTO_INCREMENT PRIMARY KEY, item VARCHAR(255), quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")
#addUser("Jordan50", "Jordan50@outlook.com", "Secret123")
#addUser("Isitha2", "Isitha29@outlook.com", "David333")

#addItem("Cardboard", 10, '2024-05-17', 1)
#addItem("Glass", 9, '2024-05-15', 1)
#addItem("Glass", 5, '2024-05-16', 2)

#editItem(2, "Glass", 3, '2024-05-16')
#result = getItems(2, '2024-05-16')

db.commit()

viewTable("items")

result = getTotalItems(2, "Glass")
print(result)