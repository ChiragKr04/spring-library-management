import psycopg2
import pandas as pd

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="postgres",
    user="postgres",
    password="123456",
)

data = pd.read_csv('books.csv')
data = data.values
allBooks = []

for i in range(len(data)):
    singleBook = []
    d = data[i][0].split(";")

    # Append ID
    singleBook.append(d[0])

    # Append Author
    singleBook.append(d[2])

    # Append available
    singleBook.append(True)

    # Append image
    singleBook.append(d[len(d)-1])

    # Append title
    singleBook.append(d[1])

    allBooks.append(singleBook)

# print(allBooks)

cursor = conn.cursor()

# Clearing books table
delete_query = "DELETE FROM book"

cursor.execute(delete_query)

conn.commit()

insert_query = "INSERT INTO book (id, author, available, image, title) VALUES (%s, %s, %s, %s, %s)"

for book in allBooks:
    try:
        values = (book[0], book[1], book[2], book[3], book[4])
        print(values)
        cursor.execute(insert_query, values)
        conn.commit()
    except Exception as e:
        print("Insertion failed for ", book, e)

print("All Data inserted")
cursor.close()
conn.close()

