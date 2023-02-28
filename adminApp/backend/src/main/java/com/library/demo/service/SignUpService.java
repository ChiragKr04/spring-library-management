package com.library.demo.service;

import com.library.demo.model.Response;
import com.library.demo.model.AdminCredential;
import com.library.demo.repository.AdminCredentialRepository;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    final AdminCredentialRepository adminCredentialRepository;
    final
    UserIdGenerator userIdGenerator;
    final
    PasswordGenerator passwordGenerator;
    final
    EmailService emailService;

    public SignUpService(AdminCredentialRepository adminCredentialRepository, UserIdGenerator userIdGenerator, PasswordGenerator passwordGenerator, EmailService emailService) {
        this.adminCredentialRepository = adminCredentialRepository;
        this.userIdGenerator = userIdGenerator;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
    }


    public Response signUp(AdminCredential user){
        Response response= new Response();
        System.out.println("SignUp" + user.getEmailId());
        System.out.println(adminCredentialRepository.existsByEmailId(user.getEmailId()));
        if (adminCredentialRepository.existsByEmailId(user.getEmailId())) {
            response.setError("Already an account exist with this emailId");
            return response;
        }
        user.setAdminId(userIdGenerator.idGenerator());
        user.setPassword(passwordGenerator.generatePassword());
        adminCredentialRepository.save(user);
        emailService.sendEmail(user);
        response.setMessage("Account is created");
        return response;
    }

    public boolean forgotPassword(String userId){
        try{
//            AdminCredential user = userRepository.FindByUserId(userId);
//            emailService.sendForgotPasswordEmail(user);
            return true;
        }catch(Exception e){
            return false;
        }
    }

}
