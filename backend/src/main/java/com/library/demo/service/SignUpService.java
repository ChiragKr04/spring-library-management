package com.library.demo.service;

import com.library.demo.model.UserCredential;
import com.library.demo.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    @Autowired
    private UserCredentialRepository userRepository;
    @Autowired
    UserIdGenerator userIdGenerator;
    @Autowired
    PasswordGenerator passwordGenerator;
    @Autowired
    EmailService emailService;
    public String signUp(UserCredential user){
        System.out.println("SignUp" + user.getEmailId());
        System.out.println(userRepository.existsByEmailId(user.getEmailId()));
        if (userRepository.existsByEmailId(user.getEmailId())) {
            return "Already an account exist with this emailId";
        }
        user.setUserId(userIdGenerator.idGenerator());
        user.setPassword(passwordGenerator.generatePassword());
        userRepository.save(user);
        emailService.sendEmail(user);

        return "Account is created";
    }
}
