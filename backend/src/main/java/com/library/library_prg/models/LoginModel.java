package com.library.library_prg.models;

public class LoginModel {

    String userEmail;
    String userPass;

    public LoginModel(String userEmail, String userPass) {
        this.userEmail = userEmail;
        this.userPass = userPass;
    }

    @Override
    public String toString() {
        return "LoginModel{" +
                "userEmail='" + userEmail + '\'' +
                ", userPass='" + userPass + '\'' +
                '}';
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPass() {
        return userPass;
    }

    public void setUserPass(String userPass) {
        this.userPass = userPass;
    }
}
