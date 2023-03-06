package com.library.demo.service;

import org.springframework.stereotype.Service;

@Service
public class PasswordGenerator {
    final private String lowerCase = "abcdefghijklmnopqrstuvwxyz";
    final private String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    final private String specialSymbol = "!@#$%^&*()_+=<>?/;:[]{}";
    final private String numbers = "1234567890";

    public String generatePassword() {
        String password="";
        for (int i = 0; i < 8; i++){
            int random = (int) ((Math.random()*26)-1);
            if(i%2==0) {
                password += lowerCase.charAt(random);
            }
            else {
                password += upperCase.charAt(random);
            }
        }
        for (int i=0; i < 4; i++){
            int random;
            if (i % 2 ==0) {
                random = (int) ((Math.random()*23)-1);
                password += specialSymbol.charAt(random);
            }
            else {
                random = (int) ((Math.random()*10)-1);
                password += numbers.charAt(random);
            }
        }
        return password;
    }
}
