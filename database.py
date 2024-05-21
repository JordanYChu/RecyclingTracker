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

def addInteraction(item, quantity, date, user_id):
    sql = "INSERT INTO interactions (item, quantity, date, user_id) VALUES (%s, %s, %s, %s)"
    val = (item, quantity, date, user_id)

    cursor.execute(sql, val)

#cursor.execute("CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))")
#cursor.execute("CREATE TABLE interactions (id INT AUTO_INCREMENT PRIMARY KEY, item VARCHAR(255), quantity INT, date DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES accounts(id));")

#addUser("Jordan50", "Jordan50@outlook.com", "Secret123")
#addUser("Isitha2", "Isitha29@outlook.com", "David333")

#addInteraction("Cardboard", 10, '2024-05-17', 1)
#addInteraction("Glass", 9, '2024-05-15', 1)
#addInteraction("Glass", 5, '2024-05-16', 2)

db.commit()

#cursor.execute("SELECT * FROM accounts")
cursor.execute("SELECT * FROM interactions WHERE item=\"Glass\"")

result = cursor.fetchall()

for x in result:
  print(x)