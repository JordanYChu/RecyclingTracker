import mysql.connector

pwd = "ENTER PASSWORD"

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

#cursor.execute("CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))")

#addUser("Jordan50", "Jordan50@outlook.com", "Secret123")
#addUser("Isitha2", "Isitha29@outlook.com", "David333")

db.commit()

cursor.execute("SELECT * FROM accounts")

result = cursor.fetchall()

for x in result:
  print(x)