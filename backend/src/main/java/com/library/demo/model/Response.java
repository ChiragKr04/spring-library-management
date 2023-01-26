package com.library.demo.model;

import org.springframework.context.annotation.Bean;

public class Response {
    private String message, error;

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
