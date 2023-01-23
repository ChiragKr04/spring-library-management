package com.library.demo.service;

import com.library.demo.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserIdGenerator {
    @Autowired
    private UserCredentialRepository userCredentialRepository;

    final private String lowerCase = "abcdefghijklmnopqrstuvwxyz";
    final private String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    final private String numbers = "1234567890";
    public String idGenerator(){
        String userId="";
        for (int i = 0; i < 4; i++){
            int random = (int) ((Math.random()*26)-1);
            if(i%2==0) {
                userId += lowerCase.charAt(random);
            }
            else {
                userId += upperCase.charAt(random);
            }
        }
        for (int i=0; i < 2; i++){
            int random = (int) ((Math.random()*10)-1);
            userId += numbers.charAt(random);
        }
        userId += userCredentialRepository.count() + 1;
        return userId;
    }
}
