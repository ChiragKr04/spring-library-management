package com.library.demo.service;

import com.library.demo.model.LoginPayload;
import com.library.demo.model.Response;
import com.library.demo.model.UserCredential;
import com.library.demo.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    UserCredentialRepository userCredentialRepository;
    public Response login(UserCredential userCredential){
        Response response = new Response();
        if(userCredentialRepository.existsByUserId(userCredential.getUserId())){
            userCredential =userCredentialRepository.fetchUser(userCredential.getUserId(), userCredential.getPassword());
            LoginPayload loginPayload = new LoginPayload();
            loginPayload.setUserId(userCredential.getUserId());
            loginPayload.setFirstname(userCredential.getFirstname());
            loginPayload.setLastname(userCredential.getLastname());
            loginPayload.setEmailId(userCredential.getEmailId());
            loginPayload.setPhoneNo(userCredential.getPhoneNo());
            loginPayload.setAddress(userCredential.getAddress());
            response.setMessage("Success");
            response.setLoginPayload(loginPayload);
            return response;


        }
        response.setError("Incorrect UserId or Password");
        return response;
    }
}
