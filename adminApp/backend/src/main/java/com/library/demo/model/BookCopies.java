package com.library.demo.model;

import org.springframework.lang.NonNull;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class BookCopies {

    @Id
    @GeneratedValue
    private long bookCopyId;

    @NonNull
    private long bookId;

    @NonNull
    private boolean isAvailable;


    public long getBookCopyId() {
        return bookCopyId;
    }

    public void setBookCopyId(long bookCopyId) {
        this.bookCopyId = bookCopyId;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    @Override
    public String toString() {
        return "BookCopies{" +
                "bookCopyId=" + bookCopyId +
                ", bookId=" + bookId +
                ", isAvailable=" + isAvailable +
                '}';
    }
}
