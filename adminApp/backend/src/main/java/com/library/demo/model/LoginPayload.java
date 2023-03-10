package com.library.demo.model;

import javax.persistence.Column;
import javax.persistence.Id;

public class LoginPayload {
    @Id
    @Column(name = "User_ID")
    private String userId;
    @Column(name = "Email_ID", unique = true, nullable = false)
    private String emailId;
    @Column(name = "Phone_No", nullable = false)
    private String phoneNo;
    @Column(name = "Address", nullable = false)
    private String address;
    @Column(name = "FirstName", nullable = false)
    private String firstName;
    @Column(name = "LastName")
    private String lastName;

    public String getFirstname() {
        return firstName;
    }

    public void setFirstname(String firstname) {
        this.firstName = firstname;
    }

    public String getLastname() {
        return lastName;
    }

    public void setLastname(String lastname) {
        this.lastName = lastname;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
