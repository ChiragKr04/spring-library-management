package com.library.demo.service;

import com.library.demo.model.UserBorrowHistory;
import com.library.demo.model.AdminCredential;
import com.library.demo.repository.AdminCredentialRepository;
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
    @Autowired
    AdminCredentialRepository userCredentialRepository;
    public void sendEmail(AdminCredential user){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("applicationtest0001@gmail.com");
        simpleMailMessage.setTo(user.getEmailId());
        //String password = passwordGenerator.generatePassword();
       // System.out.println(password);
        simpleMailMessage.setSubject("Credential");
        simpleMailMessage.setText("Hi " +user.getFirstname()
                + "\nThese are your credentials.\n"
                + "\nUser Id: " + user.getAdminId()
                + "\nPassword: " + user.getPassword());
        javaMailSender.send(simpleMailMessage);
    }
    public void sendEmailForIssueRequest(UserBorrowHistory userBorrowHistory){
//        AdminCredential user = userCredentialRepository.FindByUserId(userBorrowHistory.getUserId());
//        System.out.println(user.getEmailId());
//        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//        simpleMailMessage.setFrom("librarymanagement34@gmail.com");
//        simpleMailMessage.setTo(user.getEmailId());
//        simpleMailMessage.setSubject("Book Issue Notification");
//        simpleMailMessage.setText("Hi " + user.getFirstname()
//                + " " + user.getLastname() +"\n Book Title: " + userBorrowHistory.getBookTitle()
//                + "\n Author: " + userBorrowHistory.getAuthor()
//                + "\n Book Copy ID: " + userBorrowHistory.getCopyId() + "\nStatus: Reserved"
//                + "\n Please Kindly Collect your copy within 2 hour.");
//        javaMailSender.send(simpleMailMessage);
    }

    public void sendForgotPasswordEmail(AdminCredential user){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("librarymanagement34@gmail.com");
        simpleMailMessage.setTo(user.getEmailId());
        simpleMailMessage.setSubject("Forgot Password Email");
        simpleMailMessage.setText(
                "Hi " + user.getFirstname() + " " + user.getLastname() + ","
                + "\nYour Password is " + user.getPassword()
        );
        javaMailSender.send(simpleMailMessage);
    }
}
