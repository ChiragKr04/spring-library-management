package com.library.demo.service;

import com.library.demo.model.UserCredential;
import com.library.demo.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    UserCredentialRepository userCredentialRepository;
    public UserCredential login(UserCredential userCredential){
        System.out.println(userCredentialRepository.fetchUser(userCredential.getUserId(),
                userCredential.getPassword()).getFirstname());
        return userCredentialRepository.fetchUser(userCredential.getUserId(),
                userCredential.getPassword());
    }
}
