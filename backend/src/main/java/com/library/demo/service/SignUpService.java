package com.library.demo.service;

import com.library.demo.model.Response;
import com.library.demo.model.UserCredential;
import com.library.demo.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    private final UserCredentialRepository userRepository;
    final
    UserIdGenerator userIdGenerator;
    final
    PasswordGenerator passwordGenerator;
    final
    EmailService emailService;

    public SignUpService(UserCredentialRepository userRepository, UserIdGenerator userIdGenerator, PasswordGenerator passwordGenerator, EmailService emailService) {
        this.userRepository = userRepository;
        this.userIdGenerator = userIdGenerator;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
    }


    public Response signUp(UserCredential user){
        Response response= new Response();
        System.out.println("SignUp" + user.getEmailId());
        System.out.println(userRepository.existsByEmailId(user.getEmailId()));
        if (userRepository.existsByEmailId(user.getEmailId())) {
            response.setError("Already an account exist with this emailId");
            return response;
        }
        user.setUserId(userIdGenerator.idGenerator());
        user.setPassword(passwordGenerator.generatePassword());
        userRepository.save(user);
        emailService.sendEmail(user);
        response.setMessage("Account is created");
        return response;
    }
}
