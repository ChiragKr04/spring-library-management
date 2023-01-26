package com.library.demo.service;

import com.library.demo.model.UserCredential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private PasswordGenerator passwordGenerator;
    public void sendEmail(UserCredential user){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("applicationtest0001@gmail.com");
        simpleMailMessage.setTo(user.getEmailId());
        //String password = passwordGenerator.generatePassword();
       // System.out.println(password);
        simpleMailMessage.setSubject("Credential");
        simpleMailMessage.setText("Hi " +user.getFirstname()
                + "\nThese are your credentials.\n"
                + "\nUser Id: " + user.getUserId()
                + "\nPassword: " + user.getPassword());
        javaMailSender.send(simpleMailMessage);
    }
}
