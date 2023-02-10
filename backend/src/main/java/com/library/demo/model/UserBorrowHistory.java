package com.library.demo.model;

import org.springframework.lang.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class UserBorrowHistory {
    @Id @GeneratedValue
    private Long userBorrowHistoryId;
    @NonNull
    private String bookTitle;
    @NonNull
    private String bookId;
    @NonNull
    private String copyId;
    @NonNull
    private Date issueDate;
    @NonNull
    private Date returnDate;

    public Long getUserBorrowHistoryId() {
        return userBorrowHistoryId;
    }

    public void setUserBorrowHistoryId(Long userBorrowHistoryId) {
        this.userBorrowHistoryId = userBorrowHistoryId;
    }

    @NonNull
    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(@NonNull String bookTitle) {
        this.bookTitle = bookTitle;
    }

    @NonNull
    public String getBookId() {
        return bookId;
    }

    public void setBookId(@NonNull String bookId) {
        this.bookId = bookId;
    }

    @NonNull
    public String getCopyId() {
        return copyId;
    }

    public void setCopyId(@NonNull String copyId) {
        this.copyId = copyId;
    }

    @NonNull
    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(@NonNull Date issueDate) {
        this.issueDate = issueDate;
    }

    @NonNull
    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(@NonNull Date returnDate) {
        this.returnDate = returnDate;
    }
}
