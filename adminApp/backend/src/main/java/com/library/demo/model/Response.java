package com.library.demo.model;

import org.springframework.context.annotation.Bean;

public class Response {
    private String message, error;

    private LoginPayload loginPayload;

    public LoginPayload getLoginPayload() {
        return loginPayload;
    }

    public void setLoginPayload(LoginPayload loginPayload) {
        this.loginPayload = loginPayload;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
