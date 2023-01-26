package com.library.demo.controller;

import com.library.demo.model.Response;
import com.library.demo.model.UserCredential;
import com.library.demo.service.LoginService;
import com.library.demo.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path = "/demo")
public class Controller {

    @Autowired
    SignUpService signUpService;
    @Autowired
    LoginService loginService;

    @PostMapping(path = "/signUp")
    public Response signUp(@RequestBody UserCredential userCredential){
        System.out.println(userCredential.getEmailId());
        System.out.println(userCredential.getFirstname());
        System.out.println(userCredential.getLastname());
        System.out.println(userCredential.getPhoneNo());
        System.out.println(userCredential.getAddress());
        return signUpService.signUp(userCredential);
    }
    @PostMapping(path = "/login")
    public UserCredential login(@RequestBody UserCredential userCredential){
        System.out.println(userCredential.getUserId() +" \n"+ userCredential.getPassword());
        System.out.println(loginService.login(userCredential));
        return loginService.login(userCredential);
    }
}
