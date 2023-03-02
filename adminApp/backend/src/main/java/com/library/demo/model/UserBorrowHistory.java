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
    private String userId;
    @NonNull
    private String bookTitle;
    @NonNull
    private String author;
    @NonNull
    private boolean active;

    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @NonNull
    public String getAuthor() {
        return author;
    }

    public void setAuthor(@NonNull String author) {
        this.author = author;
    }

    @NonNull
    private Long bookId;
    @NonNull
    private Long copyId;
    @NonNull
    private Date issueDate;

    private Date returnDate;
    @NonNull
    public String getUserId() {
        return userId;
    }

    public void setUserId(@NonNull String userId) {
        this.userId = userId;
    }

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
    public Long getBookId() {
        return bookId;
    }

    public void setBookId(@NonNull Long bookId) {
        this.bookId = bookId;
    }

    @NonNull
    public Long getCopyId() {
        return copyId;
    }

    public void setCopyId(@NonNull Long copyId) {
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
