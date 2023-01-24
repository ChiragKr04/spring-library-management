package com.library.demo.service;

import com.library.demo.model.Result;
import com.library.demo.model.UserCredential;
import com.library.demo.model.UserData;
import com.library.demo.model.UserLogin;
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
        if (userRepository.existsByEmailId(user.getEmailId())) {
            return "Already an account exist with this emailId";
        }
        user.setUserId(userIdGenerator.idGenerator());
        user.setPassword(passwordGenerator.generatePassword());
        userRepository.save(user);
        emailService.sendEmail(user);

        return "Account is created";
    }

    public Result login(UserLogin user){
        Object[] result = (Object[]) userRepository.getUser(user.userId(), user.password());
        if(result == null){
            return new Result(
                    false,
                    null
            );
        }

        return new Result(
                true,
                UserData.toJson(result)
        );
    }
}
