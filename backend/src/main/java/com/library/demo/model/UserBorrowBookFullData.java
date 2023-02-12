package com.library.demo.model;

import java.math.BigInteger;
import java.util.Date;

public class UserBorrowBookFullData{
    private BigInteger userBorrowHistoryId;

    public UserBorrowBookFullData(
            BigInteger userBorrowHistoryId,
            BigInteger bookId,
            Date issueDate,
            String userId,
            String copyId,
            Date returnDate,
            boolean active,
            String author,
            boolean available,
            String image,
            String title,
            double rating,
            double price,
            String genre,
            String description
    ) {
        this.userBorrowHistoryId = userBorrowHistoryId;
        this.bookId = bookId;
        this.issueDate = issueDate;
        this.userId = userId;
        this.copyId = copyId;
        this.returnDate = returnDate;
        this.active = active;
        this.author = author;
        this.available = available;
        this.image = image;
        this.title = title;
        this.rating = rating;
        this.price = price;
        this.genre = genre;
        this.description = description;
    }

    private BigInteger bookId;
    private Date issueDate;
    private String userId;
    private String copyId;
    private Date returnDate;
    private boolean active;

    private String author;
    private boolean available;

    private String image;
    private String title;
    private double rating;
    private double price;
    private String genre;
    private String description;

    public BigInteger getUserBorrowHistoryId() {
        return userBorrowHistoryId;
    }

    public void setUserBorrowHistoryId(BigInteger userBorrowHistoryId) {
        this.userBorrowHistoryId = userBorrowHistoryId;
    }

    public BigInteger getBookId() {
        return bookId;
    }

    public void setBookId(BigInteger bookId) {
        this.bookId = bookId;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCopyId() {
        return copyId;
    }

    public void setCopyId(String copyId) {
        this.copyId = copyId;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
