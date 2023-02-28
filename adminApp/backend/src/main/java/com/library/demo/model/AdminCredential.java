package com.library.demo.model;

import javax.persistence.*;

@Entity
public class AdminCredential {
    @Id @Column(name = "Admin_ID")
    private String adminId;
    @Column(name = "Password", nullable = false)
    private String password;
    @Column(name = "Email_ID", unique = true, nullable = false)
    private String emailId;

    @Column(name = "College", unique = true, nullable = false)
    private String college;

    @Column(name = "Phone_No", nullable = false)
    private String phoneNo;
    @Column(name = "Address", nullable = false)
    private String address;
    @Column(name = "FirstName", nullable = false)
    private String firstName;
    @Column(name = "LastName")
    private String lastName;
    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


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

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
