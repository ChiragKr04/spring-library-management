package com.library.demo.controller;


import com.library.demo.model.UserCredential;
import com.library.demo.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping(path = "/demo")
public class Controller {

    @Autowired
    SignUpService signUpService;

    @PostMapping(path = "/signUp")
    public String signUp(@RequestBody UserCredential userCredential){
        return signUpService.signUp(userCredential);
    }
}
