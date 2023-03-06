import psycopg2
import openpyxl
import pandas as pd
import random

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

genre = ["Adventure", "Fiction", "SciFi", "Romance", "Inspirational"]

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
    singleBook.append(d[len(d) - 1])

    # Append title
    singleBook.append(d[1])

    singleBook.append(random.randint(20, 50) * 0.1)
    singleBook.append(random.randint(50000, 200000) * 0.01)
    singleBook.append(genre[random.randint(0, 4)])
    singleBook.append(f"Description: {d[1]}")
    print(singleBook)
    allBooks.append(singleBook)

    # sheet.append(singleBook)

# print(allBooks)

cursor = conn.cursor()

# Clearing books table
delete_query = "DELETE FROM book"

cursor.execute(delete_query)

conn.commit()

insert_query = "INSERT INTO book (id, author, available, image, title, rating, price, genre, description) VALUES (%s, " \
               "%s, %s, %s, %s, %s, %s, %s, %s) "

for book in allBooks:
    try:
        values = (book[0], book[1], book[2], book[3],
                  book[4], book[5], book[6], book[7], book[8])
        print(values)
        cursor.execute(insert_query, values)
        conn.commit()
    except Exception as e:
        print("Insertion failed for ", book, e)

print("All Data inserted")
cursor.close()
conn.close()
