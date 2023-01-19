package com.library.library_prg.controller;


import com.library.library_prg.models.User;
import com.library.library_prg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping(path = "/library")
public class ApiController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/ping")
    HashMap<String,String> ping(){
        var result = new HashMap<String, String>();

        result.put("ping","Server is running!!");

        return result;
    }

    @GetMapping("/getAllUser")
    List<User> getAllUser(){
        var result = this.userRepository.findAll();
        System.out.println("RESULT: "+result);
        return result;
    }

    @PostMapping("/createUser")
    User createUser(@RequestBody User body){
        var result = userRepository.save(body);
        System.out.println("RESULT: "+result);
        return result;
    }

}

